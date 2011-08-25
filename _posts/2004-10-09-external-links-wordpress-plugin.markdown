--- 
layout: post
title: <!--:en-->External Links Wordpress Plugin<!--:-->
tags: []

date: Sat Oct 09 12:47:55 +0200 2004
---
<strong>External links:</strong><br />
The little images that appear after an external link on this site used to be created by pure CSS, using the following rules:

    .commentlist a[href*="http"], .storycontent a[href*="http"]
    {
        padding-right: 12px;
        background: url('/wp-images/ext-link.gif') right top no-repeat;
    }
    .commentlist a[href*="jfoucher.info"], .storycontent a[href*="jfoucher.info"]
    {
        padding-right: 0;
        background-image: none;
    }

But, as you may know, this does not work in Internet Explorer. So I decided to write a little plugin that would give a specific class attribute to all external links, so that they can be styled in a manner recognizable to IE.

<strong>Languages</strong><br />
Additionally, as this is a bilingual blog, I like to show an language text after each link, like <a href="http://daniel.glazman.free.fr/weblog/archived/2002_09_15_glazblogarc.html#81664011" hreflang="en">this</a>. I used to do it in pure CSS, like so:

     a[hreflang]:after {
          content:"000a0[" attr(hreflang) "]";
          color:#999;
          background:transparent;
          font-size:0.8em
     }

but you guessed it, it doesn't work in IE, so this little plugin takes care of that as well... All you need to do is add an hreflang="whatever" attribute to your links.

<strong>Installation:</strong><br />
<ol>
<li>Download the <a href="http://jfoucher.com/source/external_links.gz>gzip file</a></li>
<li>Extract it</li>
<li>Upload the resulting file to your wp-content/plugins directory</li>
<li>Activate through the admin interface</li>
</ol>

That's it ! Now you can define styles:

<strong>For example:</strong><br />

     /* External links style */
     a.external-link, a.external-link:visited
     {
          padding-right:12px;
          background:url(/wp-images/ext-link.png) right top no-repeat;
          margin-right:0
     }
     /* Hovering external links */
     a.external-link:hover
     {
          padding-right:12px;
          background:url(/wp-images/ext-link-hover.png) right top no-repeat;
          margin-right:0
     }
     /* Language attribute */
     .hreflang {
          font-size:0.8em;
          color:#bbb
     }
