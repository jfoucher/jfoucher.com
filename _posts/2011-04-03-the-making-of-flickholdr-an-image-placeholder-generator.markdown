--- 
layout: post
title: The making of flickholdr.com, an image placeholder generator
tags: []

date: Sun Apr 03 21:42:49 +0200 2011
---
There are a few services available to web designer and HTML coders to use dummy images in their html mockups or templates. The one I used to use is <a href="http://dummyimage.com">dummyimage</a> but it is somewhat limited in that the images are completely static: a flat color and some text. I needed the same kind of service, but with actual images or photographs rather than simple placeholders. Something like dynamically generated stock images.
<h2>The idea</h2>
And then the idea dawned on me: why not use <a href="http://flickr.com">flickr</a>'s <a href="http://creativecommons.org/">creative commons</a> licensed images? The quality is often very good, especially for "interesting" images, a lot of sizes are available, and users often use tags to classify their images, making it rather easy to get placeholder images about a particular subject.

<div class="image-with-caption aligncenter" style="width:600px"><div class="caption">flickholdr.com</div><a href="http://cdn.jfoucher.com/uploads/2011/03/FlickHoldr1.png"><img class="size-full wp-image-413" title="FlickHoldr" src="http://cdn.jfoucher.com/uploads/2011/03/FlickHoldr1.png" alt="screenshot of flickholdr.com" width="600" height="417" /></a></div>
<h2>The execution</h2>
So I proceeded to develop a little webapp to do just that, using <a href="http://codeigniter.com">codeigniter</a>, my framework of choice for rapid application development

I used Codeigniter 2.0 from bitbucket, as I think it is the most up-to-date code available at the moment.

If the requested image already exists in the cache (i.e. it has already been requested) we simply echo that out, with proper headers, otherwise, we have to generate the image.
<h2>Getting images from flickr</h2>
Most of the code deals with pulling images from flickr, and then doing various to them before display. The code that pulls the image from flickr is located in a model called Flickr_model with three methods:
<ol>
	<li>A public method called <code lang="php" inline="true">search()</code>  that gets images using the <a href="http://www.flickr.com/services/api/">flickr API</a></li>
	<li>A private method called <code lang="php" inline="true">_get_sizes()</code> that finds the sizes available for that particular image</li>
	<li>Another private method <code lang="php" inline="true">_get_author()</code> that gets the information for the image and returns the name of the author, to be displayed in the watermark</li>
</ol>
The <code lang="php" inline="true">search()</code> method returns as soon as it finds an image of at least the required size.

The controller private method <code lang="php" inline="true">_get_image()</code> then takes charge of resizing, cropping and watermarking the image, using codeigniter's <a title="Codeigniter image manipulation class manual" href="http://codeigniter.com/user_guide/libraries/image_lib.html">image manipulation library</a> to keep things quick and simple. I just tweaked the watermarking method of that class to allow for semi-transparent watermarks.

The controller then sends the image to the browser with the proper headers.
<h3>End of the story!</h3>

<strong>UPDATE</strong>: Flickholdr is now open sourced and the code is available on <a href="https://github.com/jfoucher/flickholdr">github</a>
