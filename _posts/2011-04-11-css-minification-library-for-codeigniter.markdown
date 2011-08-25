--- 
layout: post
title: <!--:en-->CSS minification library for codeigniter<!--:-->
tags: 
- codeigniter
- css
- library
- minify
date: Mon Apr 11 14:10:51 +0200 2011
---
<!--:en-->For my latest project, I wanted to be able to easily minify CSS stylesheets, using the simplest syntax possible, ideally using a simple tag in the header, like <code lang="php">
<?php echo $this->css->link(array('/assets/css/fonts.css','/assets/css/layout.css');?></code>

After some searching, I found a css minification library for PHP, <a href="https://code.google.com/p/minify/">minify</a>

It was very easy to modify it so that It could be used in our CodeIgniter applications like any other libraries.
All I did was wrap the main minification function in Codeigniter specific code.
I modelled the interaction on the image library, as I guess that's what most people are used to.

[caption id="attachment_450" align="aligncenter" width="300" caption="css minification library for codeigniter"]<a href="http://cdn.jfoucher.com/uploads/2011/04/Screenshot.png"><img class="size-medium wp-image-450" title="css minification for codeigniter" src="http://cdn.jfoucher.com/uploads/2011/04/Screenshot-300x162.png" alt="css minification for codeigniter" width="300" height="162" /></a>[/caption]

<h3>How to use</h3>
Using the library involves loading it, setting up an array with some configuration values, such as the source css file(s), the destination file (optional) or the time that the generated file should be cached, and finally initializing the library with the configuration array() .

The following code, which should go in your controller, will look very familiar to Codeigniter users.

&nbsp;

<code lang="php">$this->load->library('css');
//array of files to concatenate and minify
$config['source_file']=array('/assets/css/layout.css','/assets/css/fonts.css');
//where to output the result
$config['dest_file']'/assets/css/css.min.css';
//Cache time in hours
$config['cache_time']=48;
$this->css->initialize($config);
echo $this->css->link();
</code>
Will output the following stylesheet tag:

<code lang="html"><link rel="stylesheet" href="/assets/css/css.min.css" type="text/css" media="screen" /></code>

&nbsp;
<h3>Get It!</h3>
You can <a href="https://github.com/jfoucher/codeigniter-css-library">get it from GitHub</a>. Don't forget to fork it if you think you can make it better!
<h3>Finally</h3>
I'm not sure the way I've done it, using a <code lang="php" inline="true">$config</code> array and so on, is the best way. It might be a bit overkill for such a simple library. I'd love to hear your thoughts on the subject.<!--:-->
