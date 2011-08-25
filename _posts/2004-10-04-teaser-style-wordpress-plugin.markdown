--- 
layout: post
title: <!--:en-->Teaser Style Wordpress plugin<!--:-->
tags: []

date: Mon Oct 04 12:09:11 +0200 2004
---
<!--:en-->Another useless wordpress plugin from my little factory here :). This one takes the teaser text, delimited between the beginning of a post and the &lt;!--more--&gt; tag, and wraps it in a &lt;div&gt; with class morediv. This then allows you style it differently using your style sheet, doing for example:

     .morediv{
          font-weight:bold;
     }

which is exactly what I have <a href="http://jfoucher.com/author-page-wordpress-plugin/">here</a>.

<del datetime="2011-04-28T11:11:42+00:00">To install it, either put the <a href="http://jfoucher.com/source/morediv/">source code</a> in a php file or get the <a href="http://jfoucher.com/source/morediv.gz">gzip file</a> and uncompress it.</del>

Utterly deprecated. This is here for archeological perspective, but you'd be mad to try and use it. Actually, the files can't be downloaded anymore

Upload the resulting file to your wp-content/plugins folder and activate it from the admin interface. That's all there is to it. You can then apply whichever style you want to that block.<!--:-->
