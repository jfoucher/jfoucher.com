--- 
layout: post
title: Stati, a PHP static site generator that works on any existing Jekyll site
tags: ['symfony', 'php', 'static', 'jekyll']
excerpt: Why and how I built a Jekyll clone in PHP
image:
hn_id: 15361624
---

### Success !

Well it's been quite a week. Having had an unexpected lull in my contract work, I decided to work on something fun. I use jekyll for most of my static sites, and I quite like it. It's still a mistery to me why I decided to build a clone of it. But anyway, one week later, here we are. [Stati](https://github.com/jfoucher/stati) can now build all my ex-Jekyll sites properly. Actually this blog is now generated with Stati!

### Architecture

I read this [How does Jekyll work](https://www.bytesandwich.com/jekyll/software/blogging/2016/09/14/how-does-jekyll-work.html) blog post that gives a nice high level overview of the jekyll architecture, and I decided to mostly use the same kind of process.

A main Site class holds most of the state while the generation is in progress, with [events](http://symfony.com/doc/current/components/event_dispatcher.html) being dispatched at several steps along the process so that plugins can hook into them and modify the input, the output, or simply monitor the progress of the generation process.

First all files are read, in different manner depending on their type (static files, posts or pages), then they are rendered (again differently depending on their type) and finally they are written to disk at the correct path.

### Plugins

At each point in this process, a plugin can come into play to add pages, have them written in different locations, etc...

The first plugin, and the one that is used by most Jekyll sites I know of, is the paginator. In the case of Stati, it basically takes a list of all posts and generates a new html page for each page of posts. The core Writer then takes care of putting it in it's proper path.

The second plugin is a related posts plugin. For each post it calculates the levenshtein distance of it's title to all the other posts titles and gets the 10 best matches. Lots of room for improvement here.

### Try it now!

So basically that's it, a fun project that I will probably continue to use and improve. If you'd like to give it a try, you can [get the latest release from github](https://github.com/jfoucher/stati/releases/latest) and, most importantly, [open an issue](https://github.com/jfoucher/stati/issues/new) if you run into a snag!

PS. I just remembered I have a [history]({% post_url 2005-03-08-changes-coming-soon %}) of [doing this kind of thing]({% post_url 2005-03-09-new-blog %})

UPDATE : Just got some [documentation](https://stati.jfoucher.com) online