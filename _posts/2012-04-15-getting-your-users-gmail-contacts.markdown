---
layout: post
title: Import contacts from Google by entering your email and password
tags: [webdev, php, google]
excerpt: "In some sites like for example Dropbox, you invite people from your Gmail contacts by simply entering your email and password: this is how it's done."
hn_like_button: true
date: Mon Apr 15 09:17:07 +0200 2012
---

What I wanted to do was something similar to what Dropbox does for their referral program: Allow the user to input their email and password, show them a list of their contacts and allow them to select who to invite. The invited contacts' emails would then be saved directly to database and an email sent to them.

This is what google calls the [ClientLogin](https://developers.google.com/accounts/docs/AuthForInstalledApps#Using) method of authentication. It allow your user to simply input their username and password and see a list of their contacts displayed, where they can select which ones to invite, in this case.

The way to do that is pretty easy, first we have to make a POST request to google to get an authentification token for the subsequent authenticated requests. I chose to use the [Buzz PHP library](https://github.com/kriswallsmith/Buzz) as my HTTP client. It makes everything easy and removes the necessity of countless `curl_set_opts()`. Buzz requires PHP 5.3, but I'm using Symfony2 which also does, so that's not a problem, actually more of a boon as I find PHP5.3 code generally cleaner.

I created a class `Importer` with a protected variable `$browser` which is the Buzz\Browser instance we'll be using to connect to google. Google returns the data in a line based format, so I used a little helper function to convert it to a PHP array:

{% highlight php %}
    <?php
        protected function unserializeGoogleData($data){
            $returns = array();
            foreach (explode("\n",$data) as $line)
            {
                $line = trim($line);
                if (!$line) continue;
                list($k,$v) = explode("=",$line,2);
                $returns[$k] = $v;
            }
            return $returns;
        }
    ?>
{% endhighlight %}

So first we need to get the auth token from google:

{% highlight php %}
    <?php
    $params = array(
        'accountType' => 'HOSTED_OR_GOOGLE',
        'Email' => $data['email'],
        'Passwd' => $data['password'],
        'service'=> 'cp',
        'source'=> 'mention-web-1.0',
    );
    $output = $this->browser->post('https://www.google.com/accounts/ClientLogin',
        array(),
        http_build_query($params));
    $returns = $this->unserializeGoogleData($output->getContent());
    ?>
{% endhighlight %}

Where `$data['email']` and `$data['password']` are the user's email and password, respectively.

If everything went fine, the `$returns` variable now contains an associative array with a key `Auth`, so we can proceed with the next step, actually getting the contacts:

{% highlight php %}
    <?php
    if(isset($returns['Auth'])) {
        $feed_url = "https://www.google.com/m8/feeds/contacts/" .
            urlencode($data['email']) .
            "/full?alt=json&max-results=500";
        $header = array(
            'Authorization: GoogleLogin auth=' . $returns['Auth'],
        );
        $result = $this->browser->get($feed_url, $header);
        $r = json_decode($result->getContent(), true);
        //return $r;
        $results = array();
        if(isset($r['feed']['entry']) && !empty($r['feed']['entry'])){
            $results = array_map(function($el){
                $r=array();
                if(isset($el['gd$email'])){
                    $r['email'] = $el['gd$email'][0]['address'];
                    if (isset($el['title']['$t'])){
                        $r['name'] = $el['title']['$t'];
                    }
                }
                return $r;
            }, $r['feed']['entry']);
        }
        return $results
    }else{
        return false;
    }
    ?>
{% endhighlight %}

If the user and password were incorrect, the `Auth` key will not be present in the array, and so we simply return `false`. It is recommended to see if Google requires the user to solve a catcha, in which case it should be displayed. But as that was not necessary in this case, it will be left as an exercise for the reader.
On the other hand, if everything was ok, the `$results` array is now populated with the user's contacts, so the next step is to walk over the array extracting the data we need, in this case only the main email and the full name of the contact. We populate an array with the required data and simply return it for the caller to use.

I hope this will be useful to someone, but please note that Google [recommends](https://developers.google.com/accounts/docs/AuthForInstalledApps) you use OAuth for that kind of things.

