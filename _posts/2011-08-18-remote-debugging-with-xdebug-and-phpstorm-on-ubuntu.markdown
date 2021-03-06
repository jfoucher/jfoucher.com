--- 
layout: post
title: Remote debugging with Xdebug and PhpStorm on Ubuntu
tags: []
excerpt: Phpstorm allows incoming connection from Xdebug to enable variable inspection, breakpoints and so on in your favorite IDE.
date: Thu Aug 18 01:09:13 +0200 2011
---
Being able to debug your php application right from your IDE is something that you can't fully realise the power of, unless you've tried it. The advantages are immediately obvious: as soon as the connection from Xdebug is successful, you are blinded by variable inspection, code stepping, breakpoints, etc... Debugging heaven!
It took me... a few months to finally find the time figure out how to set up everything properly, so I hope this post can help someone, somewhere. But don't worry: it retrospect, it's not that difficult at all.
<h3>First things first : install xdebug</h3>
On Ubuntu and Debian, it couldn't be easier: just open a terminal and type {% highlight bash %}sudo apt-get install
php5-xdebug{% endhighlight %} This will also install Apache and PHP if you don't have them already.
<h3>Setup Xdebug on server</h3>
Done? Right, so this created a config file in /etc/php5/conf.d called xdebug.ini, which is read by php and contains xdebug's configuration options. You'll need to open this file for editing as root, as we need to make a few changes in there. you can copy/paste the command below in the terminal, or do it your own way.
{% highlight bash %}gksu gedit /etc/apache2/conf.d/xdebug.ini{% endhighlight %}
Within this file, there will be a single line, referencing the xdebug zend extension, something like this (the path can vary slightly)
{% highlight ini %}zend_extension=/usr/lib/php5/20090626/xdebug.so{% endhighlight %}
This is what we're going to add:
{% highlight ini %}
xdebug.remote_enable=On #this enables remote debugging
xdebug.remote_host=192.168.1.83 #change this IP adress for the one of the computer you are typing on
xdebug.remote_port=9000 #this is the default, leave it as is
{% endhighlight %}
Now we restart apache so that the new configuration is taken into account:
{% highlight bash %}sudo /etc/init.d/apache2 restart{% endhighlight %}
And we that we are <strong>done</strong> on the server side of things
<h3>Prepare PhpStorm</h3>
Switch to the computer where PhpStorm is installed, and open your project. All you have to do is click on the "Accept debug connections" button, and activate Xdebug by using a browser extension. Here are four extensions to do this:
<ul>
	<li><a href="https://addons.mozilla.org/en-US/firefox/addon/58688">Firefox</a></li>
	<li><a href="https://chrome.google.com/extensions/detail/eadndfjplgieldjbigjakmdgkmoaaaoc">Chrome</a></li>
	<li><a href="http://benmatselby.posterous.com/xdebug-toggler-for-safari">Safari</a></li>
	<li><a href="https://addons.opera.com/addons/extensions/details/xdebug-launcher/?display=en">Opera</a></li>
</ul>
Use your preferred extension to activate Xdebug for the page you're on. Go back to PhpStorm, and instruct it to listen to incoming debug connections by clicking on the "Listen PHP debug connections" button <img class="alignnone" title="accept connection button" src="http://i.imgur.com/uMBOg.png" alt="" width="28" height="26" />

Now all you have to is set a breakpoint and reload your page.

<div class="image-with-caption aligncenter" style="width:319px"><div class="caption">Setting a breakpoint in PhpStorm</div><img title="Setting breakpoint" src="http://i.imgur.com/9AuKc.png" alt="Setting breakpoint" width="319" height="173" /></div>

A window will popup asking you if PhpStorm should accept the connection from Xdebug

<div class="image-with-caption aligncenter" style="width:331px"><div class="caption">Accepting connection from Xdebug on PhpStorm</div><img title="Accepting connection from Xdebug" src="http://i.imgur.com/2fZKq.png" alt="Accepting connection from Xdebug" width="331" height="398" /></div>

Just click debug and happy bug squishing!
