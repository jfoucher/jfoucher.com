---
layout: post
title: A 10 minute script to graph your server load
tags: [sysadmin, php]
excerpt: I needed to monitor the load on my web server like, right <strong>now</strong>, so I wrote this script
date: Thu Sep 17 01:09:13 +0200 2011
---
This is a quick and dirty PHP script that I whipped up in about 10 minutes, used to show the load averages on the server where it is uploaded.

Here are the load curves for the server that hosts most of my websites at the moment. It is an overworked shared server, which explains why all the curves are through the roof...

<iframe src="http://xiilo.com/uptime.php" width="650" height="450"></iframe>

The load is updated every minute with a crontab that calls this same script.

The visualization is done using the Google chart API, which does require javascript but offers some great chart options, the "annotatedtimeline" being especially suitable to my purpose.

<a title="server load graph on github" href="https://github.com/jfoucher/Server-load-graph" target="_blank">Get the source on github</a>

[installation and project details](http://jfoucher.com/projects/serverload.html)
