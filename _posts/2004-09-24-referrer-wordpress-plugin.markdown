--- 
layout: post
title: <!--:en-->Referrer Wordpress Plugin<!--:-->
tags: []

date: Fri Sep 24 09:32:50 +0200 2004
---
Referrers is a plugin I coded to show the most recent referring urls to a particular post. I had seen the <a href="http://noprerequisite.com/wp-refer/" hreflang="en">wp-refer plugin</a> from <a href="http://noprerequisite.com" hreflang="en">NoPrerequisite</a> but couldn't put it on my blog without hacking because it uses the meta fields to store its data, and as I display the metadata for other purposes in each post, it would get fairly cluttered. 

Also, I am using the very good <a href="http://randypeterman.com/StatTraq/index.php?p=14"  hreflang="en">StatTraq plugin</a>, so I thought I could make use of the fact that it already records <a href="http://dictionary.reference.com/search?q=referer"  hreflang="en">referrers</a>.



To install :
<ol>
<li>
Download and install <a href="http://randypeterman.com/StatTraq/index.php?p=14" hreflang="en">Stattraq</a>.
</li>
<li>
Download <a href="http://jfoucher.com/post_referrers.php.txt>post_referrers.php.txt</a>
</li>
<li>
Rename to post_referrers.php
</li>
<li><strong>Or</strong> get the <a href="http://jfoucher.com/source/post_referrers.gz>gzip file</a> and uncompress it.
<li>
Upload the resulting file to /wp-content/plugins
</li>
<li>
Activate it in your admin interface
</li>
</ol>

Using it is simple:

Add the following code to your index.php file, within the loop

     post_referrers(8, "&lt;li&gt;", "&lt;/li&gt;", "No referrers", "self");

Where '8' is the number of referrers to show, '&lt;li&gt;' is the text to show before each link,  '&lt;/li&gt;' is the text to showafter each link, 'No referrers' is... you guessed it! the text to show when there are no referrers yet and the last option marks the excluded hosts. If you use 'self', internal referrers only will be hidden. Otherwise, you can write a list of hosts (domain names) to ignore like this: "google.com yahoo.com example. org" and so on...

See it work at the bottom of this page, and leave a comment in case of problems.

Version 0.21 and up use Google redirection to help prevent <a href="http://jfoucher.info/2004/10/14/referrer-spam-spam-dans-les-referents/">referrer spam</a>.

<a href="http://jfoucher.info/2004/09/24/referrer-wordpress-plugin/">En Fran?ais</a>
