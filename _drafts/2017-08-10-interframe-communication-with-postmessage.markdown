---
layout: post
title: Communication between iframes with React and postMessage for an html template editor
tags: [javascript, react, iframe, webdev]
excerpt: "I decided to roll my own HTML template editor because most opensource ones, while good looking and well designed, are impossible to use."
hn_like_button: true
---

I'm working on a project where I need some sort of simple landing page editor, where "blocks" are defined at the template level and they can be rearranged, text changed or added, and not much more. Most of the software I could find was either way too complex for my needs, gave the user the freedom to _completely_ destroy the template, or were otherwise utterly useless. Think drag-and-dropping an element that doesn't appear where your mouse is and basically drops anywhere except where you decide it should go...

<!-- Screenshot of grapesjs dropping element anywhere -->
Like this. I once had an HTML email template editor built by an Indian guy for 500€ that worked better than this. But the code was uglier. But it worked. Mostly.

If it was frustrating for me I imagine how it would feel for my users who need to do this quickly and efficiently. What I needed would't have drag and drop, nor 300 sliders for everything, neither would it give the user the ability to utterly destroy the template. (Users can provide custom HTML for their pages if they so choose). Anyway, all I _need_ was the ability to place some template blocks on a page, move them up and down, remove them, and change the text bits.

> _"How hard can it be ?"_ <br><small>- me, at 3 AM on thursday night.</small>

How hard indeed ? Well, as it turns out, _quite_. But it's my fault. Scope creep. I decided it would also be possible to change the images. And also upload them. And maybe add custom buttons. And edit the background images. And the background colors. Anyway, here we are now, and this is how I've (almost, anyday now) done it :

I used an iframe to hold the displayed template, as that allows complete style (and everything else) isolation, and gives a good preview of the final result. *However*, javascript between the iframe and the "controlling" page is not that easy. Because of [single origin policy](LINK_HERE) we can't just tell the iframe to do this or that, or read it's elements to see the html that's in them.

> _"Inter-frame communication is like inter-process communication"_ <br><small>- My buddy who does C (or C++ maybe?)</small>

 Oh I forgot to say, I want to store somewhat structured data about the edits, not just the raw HTML, to enable easier further edits if necessary. [mobiledoc](LINK_ERE) seemed promising. I spent about an hour investigating it (my internet was slow that day, I swear!) before I realised it's basically markdown. I thought adapting it to my use case, but it felt futile (as in: too much work). So what was I on about ? ah yes, iframes ! Mmmm who doesn't love a  good iframe? You don't? Good, 'cause me neither. Anyway, inter-frame communication is like inter-process communication (or so says my buddy that does printer drivers for HP -- Yeah, I'll curse him on your behalf if you have an HP printer) : you have to pass messages around, in our case with [`window.postMessage()`](LINK_HERE). It works, it's great!





If you do, and you like it, or you hate it, or it doesn't work, or anything, your feedback would be invaluable. Contact me [by email](mailto:j_foucher@marinetechs.com) or through [this blog's contact form](/contact).