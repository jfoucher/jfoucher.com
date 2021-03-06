--- 
layout: post
title: The making of flickholdr.com, an image placeholder generator
tags: []

date: Sun Apr 03 21:42:49 +0200 2011
excerpt: Flickholdr.com takes your chosen image dimensions, your tags, and returns Creative Commons licensed images from flickr that fit your criteria.
---
There are a few services available to web designer and HTML coders to use dummy images in their html mockups or templates. The one I used to use is <a href="http://dummyimage.com">dummyimage</a> but it is somewhat limited in that the images are completely static: a flat color and some text. I needed the same kind of service, but with actual images or photographs rather than simple placeholders. Something like dynamically generated stock images.

### The idea

And then the idea dawned on me: why not use <a href="http://flickr.com">flickr</a>'s <a href="http://creativecommons.org/">creative commons</a> licensed images? The quality is often very good, especially for "interesting" images, a lot of sizes are available, and users often use tags to classify their images, making it rather easy to get placeholder images about a particular subject.

<a href="http://jfoucher.com/uploads/2011/03/FlickHoldr1.png"><img class="size-full wp-image-413" title="FlickHoldr" src="http://jfoucher.com/uploads/2011/03/FlickHoldr1.png" alt="screenshot of flickholdr.com" width="600" height="417" /></a>


### The execution

So I proceeded to develop a little webapp to do just that, using <a href="http://codeigniter.com">codeigniter</a>, my framework of choice for rapid application development

I used Codeigniter 2.0 from bitbucket, as I think it is the most up-to-date code available at the moment.

If the requested image already exists in the cache (i.e. it has already been requested) we simply echo that out, with proper headers, otherwise, we have to generate the image.
### Getting images from flickr
Most of the code deals with pulling images from flickr, and then doing various to them before display. The code that pulls the image from flickr is located in a model called Flickr_model with three methods:
* A public method called {% highlight php %}search(){% endhighlight %}  that gets images using the [flickr API](http://www.flickr.com/services/api/)
* A private method called {% highlight php %}_get_sizes(){% endhighlight %} that finds the sizes available for that particular image
* Another private method {% highlight php %}_get_author(){% endhighlight %} that gets the information for the image and returns the name of the author, to be displayed in the watermark

The {% highlight php %}search(){% endhighlight %} method returns as soon as it finds an image of at least the required size.

The controller private method {% highlight php %}_get_image(){% endhighlight %} then takes charge of resizing, cropping and watermarking the image, using codeigniter's <a title="Codeigniter image manipulation class manual" href="http://codeigniter.com/user_guide/libraries/image_lib.html">image manipulation library</a> to keep things quick and simple. I just tweaked the watermarking method of that class to allow for semi-transparent watermarks.

The controller then sends the image to the browser with the proper headers.

### End of the story!

**UPDATE**: Flickholdr is now open sourced and the code is available on [github](https://github.com/jfoucher/flickholdr)