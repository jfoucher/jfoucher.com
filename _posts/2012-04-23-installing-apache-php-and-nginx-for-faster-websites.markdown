---
layout: post
title: Installing PHP, Apache2 and nginx for faster websites
tags: [webdev, php, server admin]
excerpt: "I recently decided to go with a small VPS for some of my sites, and to get decent performance without too much work I used Nginx as a proxy to Apache2."
hn_like_button: true
date: Mon Apr 23 08:17:07 +0200 2012
---



My contract with my previous shared hosting contractor is coming to a close, and as they seem to have all but abandoned their business, I decided it was time to move away. I looked at using Amazon's EC2, but ultimately decided to go with Bhost, with which I'm fairly happy so far. To get some decent performance out of it, I planned to use Nginx as my web server

### Keep using Apache as usual

All my websites are configured to work with apache, sometimes using fairly advanced rewrite rules, and a fair proportion of wordpress sites. So to save myself a ton of work I decided to just use Nginx as a proxy to apache and not reconfigure each site to use Nginx's rewrite rules.

### Install required software

I'm using Ubuntu, but the steps below should be fairly easy to adapt to your distribution of choice. To install everything from scratch, just run `sudo apt-get install php5 apache2 mysql-server php5-mysql nginx`. This installs mysql, Apache, PHP and Nginx

### Configure Apache and Nginx

I created one bash script that creates the necessary virtual hosts files for Apache and Nginx, by taking a template a doing a search/replace with sed. Here is the apache virtual host template that goes into `/etc/apache2/sites-available`:

{% highlight apache %}
    <VirtualHost *:8080>
        ServerAdmin webmaster@localhost
        ServerName template
        ServerAlias template www.template cdn.template cdn2.template
        DocumentRoot /var/www/template
        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>
        <Directory /var/www/template/>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all
        </Directory>
        ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
        <Directory "/usr/lib/cgi-bin">
                AllowOverride None
                Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
                Order allow,deny
                Allow from all
        </Directory>
        ErrorLog ${APACHE_LOG_DIR}/error.log
        # Possible values include: debug, info, notice, warn, error, crit,
        # alert, emerg.
        LogLevel warn
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        Alias /doc/ "/usr/share/doc/"
        <Directory "/usr/share/doc/">
            Options Indexes MultiViews FollowSymLinks
            AllowOverride None
            Order deny,allow
            Deny from all
            Allow from 127.0.0.0/255.0.0.0 ::1/128
        </Directory>
    </VirtualHost>
{% endhighlight %}

You'll notice that Apache listens on port 8080. You need to change the port from 80 to 8080 in `/etc/apache2/ports.conf` as well, this is what mine looks like after the change :

{% highlight apache %}
    NameVirtualHost *:8080
    Listen 8080
    <IfModule mod_ssl.c>
        # If you add NameVirtualHost *:443 here, you will also have to change
        # the VirtualHost statement in /etc/apache2/sites-available/default-ssl
        # to <VirtualHost *:443>
        # Server Name Indication for SSL named virtual hosts is currently not
        # supported by MSIE on Windows XP.
        Listen 443
    </IfModule>
    <IfModule mod_gnutls.c>
        Listen 443
    </IfModule>
{% endhighlight %}

Next up is the template for the default nginx site, which is much simpler and goes in `/etc/nginx/sites-available`:

{% highlight nginx %}
    server {
        listen 80;
        access_log /var/log/nginx.access.log;
        error_log /var/log/nginx.error.log;
        root /var/www/template;
        index index.php index.html;
        server_name template *.template;
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
                proxy_pass http://127.0.0.1:8080;
        }
        location ~ /\.(ht|git) {
                deny all;
        }
    }
{% endhighlight %}

All that does is proxy everything to apache on localhost, port 8080

So, our virtual host templates are ready, and if you only have one or two sites you could copy the contents to a new file by hand and change the word `template` for your actual domain name / folder, but as I had quite a few sites to convert, I created a small bash script that takes car of it for me, by just calling it with the hostname:

{% highlight bash %}
    #!/bin/bash
    CMDLN_ARGS="$@" # Command line arguments for this script
    export CMDLN_ARGS
    # Run this script as root if not already.
    chk_root () {
     if [ ! $( id -u ) -eq 0 ]; then
       echo "Please enter your password."
       exec sudo su -c "${0} ${CMDLN_ARGS}" # Call this prog as root
       exit ${?}  # since we're 'execing' above, we wont reach this exit
                  # unless something goes wrong.
     fi
    }
    chk_root
    cat /etc/apache2/sites-available/template | sed "s/template/$1/g" |cat > /etc/apache2/sites-available/$1
    ln -s /etc/apache2/sites-available/$1 /etc/apache2/sites-enabled/$1
    cat /etc/nginx/sites-available/template | sed "s/template/$1/g" |cat > /etc/nginx/sites-available/$1
    ln -s /etc/nginx/sites-available/$1 /etc/nginx/sites-enabled/$1
    if [ -d /var/www/$1 ];
    then
      echo "host directory exists";
    else
      echo "creating directory"
      mkdir "/var/www/$1"
    fi
    chown -R www-data:www-data /var/www/$1
    /etc/init.d/apache2 restart
    /etc/init.d/nginx restart
{% endhighlight %}

Put this say in your home folder and give it executable permission with `chmod 755 new_host` or whatever you named the file.

Then run it with `./new_host example.com`

This will create a folder in `/var/www/example.com`, copy the updated template virtual host configuration to the required location and restart apache and nginx.

Now put some content in that folder and configure your mysql connection if neccesary

You should now be able to browse to example.com and see your brand new site. Some quick benchmarking with ab gives roughly a tenfold increase in requests per second, depending on the configuration of the website itself

These are some rough numbers for [Six Pixels](http://6px.eu), built with Kohana2 without any caching mechanism

`ab -c20 -n200 http://6px.eu:8080/` is hitting Apache on port 8080

    Server Hostname:        6px.eu
    Server Port:            8080

    Document Path:          /
    Document Length:        12101 bytes

    Concurrency Level:      20
    Time taken for tests:   282.679 seconds
    Complete requests:      200
    Failed requests:        0
    Write errors:           0
    Total transferred:      2486000 bytes
    HTML transferred:       2420200 bytes
    Requests per second:    0.71 [#/sec] (mean)
    Time per request:       28267.940 [ms] (mean)
    Time per request:       1413.397 [ms] (mean, across all concurrent requests)
    Transfer rate:          8.59 [Kbytes/sec] received

Now with nginx `ab -c20 -n200 http://6px.eu/`


    Server Hostname:        6px.eu
    Server Port:            80

    Document Path:          /
    Document Length:        12081 bytes

    Concurrency Level:      20
    Time taken for tests:   40.606 seconds
    Complete requests:      200
    Failed requests:        0
    Write errors:           0
    Total transferred:      2482000 bytes
    HTML transferred:       2416200 bytes
    Requests per second:    4.93 [#/sec] (mean)
    Time per request:       4060.612 [ms] (mean)
    Time per request:       203.031 [ms] (mean, across all concurrent requests)
    Transfer rate:          59.69 [Kbytes/sec] received

### Update:

As rightly noted by [@arnaud_lb](https://twitter.com/#!/arnaud_lb/status/196610128261296129) the benchmarks should give nearly the same results,
as nginx is waiting for Apache to return it's data before sending it along.
What happened in those benchmarks is that [cloudflare.com](http://cloudflare.com) (highly recommended by the way) was caching some results and not others.

When I tried on localhost, the results were effectively the same.
So the way to get better performance is to get nginx to cache the results from apache, by adding the following to your nginx virtual host definition :

{% highlight nginx %}
    proxy_cache one;
    proxy_cache_use_stale error timeout invalid_header updating;
    proxy_cache_key $scheme$host$request_uri;
    proxy_cache_valid       200 301 302 20m;
    proxy_cache_valid       404 1m;
    proxy_cache_valid       any 15m;
{% endhighlight %}

where the `proxy_cache` named `one` is defined in nginx.conf as such :

{% highlight nginx %}
    proxy_cache_path /usr/local/nginx/proxy levels=1:2 keys_zone=one:15m inactive=7d max_size=1000m;
{% endhighlight %}

The `proxy_cache_valid` entries above define different cache times for various response codes

And here are the real benchmarks :

#### Apache:

    Server Hostname:        direct.6px.eu
    Server Port:            8080

    Document Path:          /
    Document Length:        11487 bytes

    Concurrency Level:      10
    Time taken for tests:   15.082 seconds
    Complete requests:      200
    Failed requests:        0
    Write errors:           0
    Total transferred:      2338600 bytes
    HTML transferred:       2297400 bytes
    Requests per second:    13.26 [#/sec] (mean)
    Time per request:       754.075 [ms] (mean)
    Time per request:       75.408 [ms] (mean, across all concurrent requests)
    Transfer rate:          151.43 [Kbytes/sec] received

#### Nginx:

    Server Hostname:        direct.6px.eu
    Server Port:            80

    Document Path:          /
    Document Length:        3031 bytes

    Concurrency Level:      10
    Time taken for tests:   0.027 seconds
    Complete requests:      200
    Failed requests:        0
    Write errors:           0
    Total transferred:      654600 bytes
    HTML transferred:       606200 bytes
    Requests per second:    7305.94 [#/sec] (mean)
    Time per request:       1.369 [ms] (mean)
    Time per request:       0.137 [ms] (mean, across all concurrent requests)
    Transfer rate:          23351.88 [Kbytes/sec] received


Just, wow...

Careful though as this will wreak havoc on your sessions, at the minimum you can disable caching for logged-in users with

{% highlight nginx %}
    proxy_cache_bypass $cookie_session;
    proxy_no_cache $cookie_session;
{% endhighlight %}

where `session` is the name of your cookie