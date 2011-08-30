--- 
layout: post
title: Sending your email database to your GMail account
tags: []

date: Mon Sep 27 20:28:45 +0200 2004
---
After I got my GMail account, I wanted to transfer all my local emails there. Why? I don't know, beacause it doesn't seem like the <a href="http://www.templetons.com/brad/gmail.html">best thing to do</a>. I tried Mark Lyon's <a href="http://www.marklyon.org/gmail/">Google Mail Loader</a>, but it kept locking up, so I wrote a little php script to read an mBox file and send the emails it contains one by one to a GMail account.


Copy the source from <a href="http://jfoucher.com/source/gmail/>this page</a> to a php file or get the <a href="http://jfoucher.com/source/gmail.gz>gzip file</a>, uncompress and host it on your own web site, but make sure no one has access to it, as it can be used to send span or whatever to any account. When you load it up in your browser, it will ask you for your GMail address and the mBox file to send. Click on 'go' and it starts sending your emails. It sends one every three seconds, so sending a whole database might take a while...
