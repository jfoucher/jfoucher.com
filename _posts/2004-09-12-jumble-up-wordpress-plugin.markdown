--- 
layout: post
title: Jumble Up! Wordpress Plugin
tags: []

date: Sun Sep 12 11:31:25 +0200 2004
---
You've pbarloby raed taht txet smerwheoe alaerdy :

Aoicncdrg to an Enligsh utsinvriey stduy the oedrr of lettres in a wrod desnot mttaer the only tnhig ttahs iatomnrpt is that the fisrt and lsat leettr of evrey wrod is in the crrcoet piotoisn the rest can be jbmeuld and one is siltl albe to read the txet whuoitt dflfciituy.
<p>You've pbarloby raed taht txet smerwheoe alaerdy :</p>
<p>Aoicncdrg to an Enligsh utsinvriey stduy the oedrr of lettres in a wrod desnot mttaer the only tnhig ttahs iatomnrpt is that the fisrt and lsat leettr of evrey wrod is in the crrcoet piotoisn the rest can be jbmeuld and one is siltl albe to read the txet whuoitt dflfciituy.<br />
<!--more-->

This is what the 'Jumble Up!' plugin will do to the commenters which you consider as spammers or trolls, based on their IP address. I took some inspiration from the <a title="View this plugin" hreflang="en" href="http://wiki.wordpress.org/Disemvoweler">Disemvoweler plugin</a> for the spam targeting.

Install is not difficult : <a href="/jumble.php.txt">Download</a>, rename to jumble.php, upload it to your wp-contents/plugins directory and activate it from the admin interface.

Now, to target specific IPs for jumble-isation, open jumble.php and edit the line where it says :

<code lang="php">$jumbleIPs = array("0.0.0.0");</code>

and add spammer IPs as such :

<code lang="php">$jumbleIPs = array("10.1.12.13","34.123.45.3");</code></p>
<p>This is what the 'Jumble Up!' plugin will do to the commenters which you consider as spammers or trolls, based on their IP address. I took some inspiration from the <a title="View this plugin" hreflang="en" href="http://wiki.wordpress.org/Disemvoweler">Disemvoweler plugin</a> for the spam targeting.</p>
<p>Install is not difficult : <a href="http://www.jfoucher.marinetechs.com/jumble.php.txt">Download</a>, rename to jumble.php, upload it to your wp-contents/plugins directory and activate it from the admin interface.</p>
<p>Now, to target specific IPs for jumble-isation, open jumble.php and edit the line where it says :</p>
<p><code>$jumbleIPs = array("0.0.0.0");</code></p>
<p>and add spammer IPs as such :</p>
<p>$jumbleIPs = array("10.1.12.13","34.123.45.3")</p>
