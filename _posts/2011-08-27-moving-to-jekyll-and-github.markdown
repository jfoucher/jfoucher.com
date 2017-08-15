---
layout: post
title: Moving from Wordpress to Jekyll and Github
tags: [webdev, ruby, github]
excerpt: "I stopped using Wordpress for this blog a long time ago. This is how I did it."
---

The web server where my blog was hosted seemed to slow down by the day, and I'm looking for ways to move some stuff out of the way. I had heard of github pages, that allow one to host a static site for free, on a url like [http://jfoucher.github.com](http://jfoucher.github.com). Git hub recently added the abilily to do a CNAME (kind of a DNS reidrect) from a custom domain name to a gituhub page. 

The last element that decided me in favor of this setup is jekyll, a static site generator written in ruby. You write your posts in markdown, type "jekyll" on the command line, and your site is generated in a few seconds.

Afterwards, just commit and push to github, and voilà, your site is live!