--- 
layout: post
title: Installing and running APC cache with CodeIgniter
tags: []

date: Sun Feb 13 23:33:33 +0100 2011
---
<span style="color: #000000; line-height: 27px;">APC cache</span> Codeigniter 2 now includes an excellent cache driver, which makes it dead easy to use any one of the great available cache librairies such as <a href="http://php.net/apc">APC</a> o <a href="http://www.memcached.org/">memcached</a>. In this post I will focus on APC, it's installation on an <a href="/?p=193">Ubuntu 10.04 server</a>, and a few benchmarks to compare the various cache systems.  For my testing, I will use an Ubuntu Server installation, on a VirtualBox virtual machine with 256 Mb of RAM and a single processor. This enables me to test things until everything breaks, than just scrap that VM and start with a clean one. However, a description of this setup is a story for another day...
<h3>Installation</h3>
On Ubuntu, and on other debian based linuxes, you can install APC by typing {% highlight bash %}sudo apt-get install php-apc{% endhighlight %} on the command line. Of course, you will have to install Apache and php before that, but that is really easy: {% highlight bash %}sudo apt-get install php5{% endhighlight %} will install <a href="http://php.net">PHP</a> and all needed dependencies, including <a href="http://apache.org">apache</a> So now that APC is installed, just restart apache {% highlight bash %}sudo /etc/init.d/apache2 restart{% endhighlight %} and you're ready to go.  In codeigniter, you don't need to do anything special. Just turn the cache on by putting the following line somewhere in your controller:  {% highlight php %}$this-&gt;output-&gt;cache(n);{% endhighlight %} Where 'n' is the number of minutes to cache that particular content.  The cache library is clever enough to pick the best cache driver from the four available ones (memcached, APC, file and dummy). Forget about the dummy driver: it doesn't do anything
<h3>Benchmarks</h3>
These are the results for 50 concurrent connections : For APC we get about 43 requests/s, with the file caching mecanism around 25, requests/s, and with no cache at all we are below 18 requests/s
<p style="text-align: center;"><a href="http://cdn.jfoucher.com/uploads/2011/02/chart22.png"><img class="aligncenter size-full wp-image-387" title="Codeigniter APC cache benchmark" src="http://cdn.jfoucher.com/uploads/2011/02/chart22.png" alt="APC: 43, File: 25, None: 18 " width="560" height="260" /></a></p>
<p style="text-align: left;">For low concurency (2) the improvement when using APC is similar: in this case the number of requests per second nearly doubled, from 19 to 47 between the case without any caching system and the APC case</p>
<p style="text-align: left;"><a href="http://cdn.jfoucher.com/uploads/2011/02/chart2.png"><img class="aligncenter size-full wp-image-383" title="Codeigniter cache benchmark: low concurency" src="http://cdn.jfoucher.com/uploads/2011/02/chart2.png" alt="APC: 46.37 rps, File: 27.23 rps, None: 18.99 rps" width="560" height="260" /></a></p>
<p style="text-align: left;">So just turning the default codeigniter cache on gives us a significant speed improvement, going all the way and installing APC can nearly double the speed of your application. Not too shabby I should think.</p>
<p style="text-align: left;">It is <strong>so</strong> easy to take advantage of this caching mechasism on Codeigniter 2 that it would really be a pity not to do so!</p>
<p style="text-align: left;">The only caching library missing here is memcached. Have you tried any of these caching libraries with codeigniter 2?</p>
<p style="text-align: left;"></p><p>
</p>
<p></p>
