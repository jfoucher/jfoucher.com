---
layout: post
title: Communication between iframes with React and postMessage for an html template editor
tags: [javascript, react, iframe, webdev]
excerpt: "I decided to roll my own HTML template editor because most opensource ones, while good looking and well designed, are impossible to use."
image: /uploads/2017/08/leanr.jpg
hn_id: 15022078
---

I'm working on a project where I need some sort of simple landing page editor, where "blocks" are defined at the template level and they can be rearranged, text changed or added, and not much more. Most of the software I could find was either way too complex for my needs, gave the user the freedom to _completely_ destroy the template, or were otherwise pretty useless. 

{: .image}
![Editor in action](/uploads/2017/08/leanr.jpg)

If it was frustrating for me I imagine how it would feel for my users who need to do this quickly and efficiently. What I needed would't have drag and drop, nor 300 sliders for everything, neither would it give the user the ability to completely modify the template. (Users can provide custom HTML for their pages if they so choose). Anyway, all I _need_ was the ability to place some template blocks on a page, move them up and down, remove them, and change the text bits.

> _"How hard can it be ?"_ <br><small>- me, at 3 AM on thursday night.</small>

How hard indeed ? Well, as it turns out, _quite_. But it's my fault. Scope creep. I decided it would also be possible to change the images. And also upload them. And maybe add custom buttons. And edit the background images. And the background colors. Anyway, here we are now, and this is how I've (almost, anyday now) done it :

I used an iframe to hold the displayed template, as that allows complete style (and everything else) isolation, and gives a good preview of the final result. *However*, javascript between the iframe and the "controlling" page is not that easy. Because of [same origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) we can't just tell the iframe to do this or that, or read it's elements to see the html that's in them.

> _"Inter-frame communication is like inter-process communication"_ <br><small>- My buddy who does C (or C++ maybe?)</small>

 Oh I forgot to say, I want to store somewhat structured data about the edits, not just the raw HTML, to enable easier further edits if necessary. [mobiledoc](https://github.com/bustle/mobiledoc-kit) seemed promising. I spent about an hour investigating it (my internet was slow that day, I swear!) before I realised it's basically markdown. I thought adapting it to my use case, but it felt futile (as in: too much work). So what was I on about ? ah yes, iframes ! Mmmm who doesn't love a  good iframe? You don't? Good, 'cause me neither. Anyway, inter-frame communication is like inter-process communication (or so says my buddy that does printer drivers for HP -- Yeah, I'll curse him on your behalf if you have an HP printer): you have to pass messages around, in our case with [`window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). It works, it's great!

 Anyway, here's how it works: I like to think of it as communication between say a frontend and an API, mostly because of the asynchronous nature of the communication. So basically, the parent page get ready to receive messages from the iframe by listening to the "message" event, like so:

```js
    window.addEventListener('message', this.handleFrameTasks.bind(this))
```

 I'm using react for the frontend, so this went in the `componentDidMount()` method, but you could place it anywhere, really, as long as it runs when you want to start editing on the iframe side.

 And then on the iframe side I have something like this:

{% highlight js %}
    // Send message to react
    var data = {
        action: 'deleteBlock',
        blockId: blockId,
    };
    top.postMessage(data, '*');
{% endhighlight %}

In fact at the start I was `JSON.stringify()`ing the data I sent, as I remember it being necessary a few years ago, but that's not required anymore.

Then on the parent React side, the `handleFrameTasks` dispatches the actions required depending on what the iframe requested. For example in the case above it will delete the page block with id `blockId` from it's page data structure.

Did I mention that the iframe content is generated dynamically and injected in the iframe src with a data blob URL? Well then, maybe I'll post about that the next time.

Until then, keep coding !

PS Oh about that [One project per month challenge]({% post_url 2016-03-01-one-project-per-month-first-budget-tracking %})? This one is bigger than I expected, so it will (has already been) longer than a month. It will be great, I hope. Everything you need for an early stage startup. [Contact me](/contact.html) if you'd like some more info.

