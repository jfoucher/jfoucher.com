--- 
layout: post
title: Author page wordpress plugin
tags: []

date: Sun Oct 03 17:30:49 +0200 2004
---
This plugin shows a specific page for each author, showing the number of posts published and some of the data entered in the Wordpress admin section, i.e. URL, AIM ICQ number, etc... except email! But it can provide a contact form that will send an email to the author's address. 

You can use it as an <a href="http://binarybonsai.com/about/">'About' page</a> for a personnal weblog or to give each author their own page in a collaborative blog.


To install it, download the <a href="http://jfoucher.com/source/author/>source code</a> and save it in a php file or get the <a href="http://jfoucher.com/source/author.gz>gzip file</a> and unpack it.

Upload the resulting file to your wp-content/plugins directory and activate it from the admin interface.

To use it put the author() function in you index.php template,
where it normally shows the message that there are no posts.

In the default template, it looks like this:

     <?php endforeach; else: ?>
     <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
     <?php endif; ?>

Replace this by :

     <?php endforeach; else: ?>
     <?php author(true, 5); ?>
     <?php endif; ?>

The first optionnal boolean parameter gives you the opportunity to show or hide
a contact form for the author. Defaults to 'true' (show the form). 

In version 0.2+, the second parameter is an integer an defines the number of latest posts to show. The default is '0'.
You may want to change some of the text in the plugin file to your own language.

To do a link to the author page, you have to do something like this:

     <a href="index.php?author_name=<?php the_author_login(); ?>">
     <?php the_author(); ?></a>

if you do not wish to or can't use rewrite rules.

On this site, I use the following rewrite rule: 

     RewriteRule ^about/? /index.php?author_name=jonathan [QSA]

With a link to the 'About' page simply like this :

     <a href="http://jfoucher.com/about/>About</a>

On a multiuser blog, you could do this:

    RewriteRule ^author/?(.*)/? /index.php?author_name=$1 [QSA]

and so the link to the page is like this:

     <a href="http://jfoucher.com/author/<?php the_author_login(); ?>
     <?php the_author(); ?></a>

Version 0.3+ use native Wordpress functions to display the author data, making it more compatible (I hope) with future versions of Wordpress.

<a href=http://jfoucher.info/2004/10/08/plugin-wordpress-page-auteur/" hreflang="fr">En Fran?ais</a>
