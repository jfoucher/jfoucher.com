--- 
layout: post
title: Stylesheet Chooser Version 0.2
tags: []

date: Thu Sep 02 20:28:10 +0200 2004
---
<!--:en-->This plugin is deprecated. 

I had tried for a while to find a way to allow users to choose their favorite theme for this website. I decided to do it as a Wordpress plugin, which I offer today for other Wordpress users.

Installing it is quite simple:<a href="http://jfoucher.com/stylesheet_chooser.txt"> Download</a>, rename to stylesheet_chooser.php, upload it to your wp-contents/plugins directory and activate it from the admin interface.

To define which stylesheets to use (no, it's not automatic...), you have to define an array called $styles, before you call any of the other functions.You can do it like this, for example :
<code lang="php">$styles=array("styles/default","styles/no-style")</code>
if your stylesheets are in the styles directory. Omit the '.css' part. The first one in the list will be used as your default style. The plugin will automatically select the last part of the path (in this case new, default and no-style) and use them as the text in the selection box.
The optional parameter - for example style_link(false) - can be set to 'true' (default) if you want to @import the style sheets (<a href="http://www.thesitewizard.com/css/excludecss.shtml">ignored by NS4</a>), or to 'false' to get this kind of links: &lt;link rel="stylesheet" title="....&gt; for the current chosen style sheet and like this:&lt;link rel="alternate stylesheet" title="....&gt; for the other(s).

style_chooser() will insert the form that is used to select the stylesheet. Place it wherever you want, in your sidebar for example.

In version 0.23+, it is possible to have a short comment appear below the selection dropdown. For this, the only thing you have to do is insert it in your stylesheets like this:
<code lang="php">/*
Comment: Write your comment here.
*/
</code>
And that's it, now each stylesheet has it's own "introduction text".

Now that you know all this, you can :
<ul>
	<li>Download</li>
	<li>write a comment,</li>
	<li>or <a href="http://jfoucher.com/about">Contact me</a> in case you have problems</li>
</ul><!--:--><!--:fr-->I had tried for a while to find a way to allow users to choose their favorite theme for this website. I decided to do it as a Wordpress plugin, which I offer today for other Wordpress users.

Installing it is quite simple:<a href="http://jfoucher.com/stylesheet_chooser.php.txt"> Download</a>, rename to stylesheet_chooser.php, upload it to your wp-contents/plugins directory and activate it from the admin interface.

To define which stylesheets to use (no, it's not automatic...), you have to define an array called $styles, before you call any of the other functions.You can do it like this, for example :
<pre>$styles=array("styles/default","styles/no-style")</pre>
if your stylesheets are in the styles directory. Omit the '.css' part. The first one in the list will be used as your default style. The plugin will automatically select the last part of the path (in this case new, default and no-style) and use them as the text in the selection box.
The optional parameter - for example style_link(false) - can be set to 'true' (default) if you want to @import the style sheets (<a href="http://www.thesitewizard.com/css/excludecss.shtml">ignored by NS4</a>), or to 'false' to get this kind of links: &lt;link rel="stylesheet" title="....&gt; for the current chosen style sheet and like this:&lt;link rel="alternate stylesheet" title="....&gt; for the other(s).

style_chooser() will insert the form that is used to select the stylesheet. Place it wherever you want, in your sidebar for example.

In version 0.23+, it is possible to have a short comment appear below the selection dropdown. For this, the only thing you have to do is insert it in your stylesheets like this:
<pre>/*</pre>
<pre>Comment: Write your comment here.</pre>
<pre>*/</pre>
And that's it, now each stylesheet has it's own "introduction text".

Now that you know all this, you can :
<ul>
	<li>Download</li>
	<li>write a comment,</li>
	<li>or <a href="http://jfoucher.com/about">Contact me</a> in case you have problems</li>
</ul><!--:-->
