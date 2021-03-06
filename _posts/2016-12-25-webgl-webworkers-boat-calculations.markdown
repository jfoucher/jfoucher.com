---
layout: post
title: Building a webGL and webworkers boat hydrostatics app
tags: [javascript, webgl, webworker, yachtdesign]
excerpt: "I had a need for a simple program to do some calculations for a boat design I'm studying, so I built it from scratch with webGL and webworkers."
hn_like_button: true
image: /uploads/2017/08/hydro.jpg
date: Tue Dec 20 10:17:07 +0200 2016
hn_id: 13219381
---

I've recently felt the urge to start designing boats again, as I have had some ideas I wanted to explore, specifically for boats of the [Mini 650 class](http://classemini.org). The software I use has basic hydrostatics capabilities, but only for an upright boat. It cannot calculate the GZ curve, or get the righting moment at specific heel angles, which is a crucial data for the kind of craft I wanted to design.

Existing solutions are extremely powerful and extremely expensive, so I decided i'd spend a few days rolling my own, with only the features I needed for the time being. I have all the technical background for this type of calculations, so I figured it shouldn't be too hard. I really wanted to display a 3D view of the model, and not have it only output data in table format, and since I had never used web GL and was curious about, I figured it was the perfect time to try it out. Pro tip : if you're not used to openGL or working in 3D programatically, use [three.js](https://threejs.org/). Thank me later.

So at first I built something very basic that just displayed the model in threejs and did some static calculations, in the UI thread. At first it worked ok, but as soon as I added functionality to solve for trim (to align longitudinal center of gravity with the longitudinal center of buoyancy) it started to get very slow. The 3D view could not even be moved around anymore because the UI thread was doing all the calculations in the foreground. Basically to do this kind of calculations, you have to move the model up and down to adjust for the correct displacement, and then pitch it forwards or aft until the center of buoyancy aligns with the center of gravity. This loop is computationally intensive and made everything grind to a halt.

So webworkers to the rescue. I had never really used them either, but they promised to make it easy to send most of the work to a background thread that would not slow down my UI. I refactored my code to put all the heavy lifting into separate files that could then be called as a web worker. I also had to add messaging to pass data to and from the UI javascript. That was fairly easy to do, as they are simple calls to postMessage, and a callback function in the UI and the worker to receive sent messages. Very easy and obvious, so great !

The calculations are accurate, I've had them checked in many cases against an old Hydromax version, which is an established solution in the field, and the results match within about a percentage point. The only difficulty I'm still struggling with is to properly draw the underwater stations and the waterline, but this is only a display bug and does not affect the results. What happens is that there are many edge cases that have to be accounted for, depending on the type and quality of the input file. I'm still working on that.

If you like designing boats and currently do these kinds of calculations by hand or in a spreadsheet, or if your current software does not solve for trim, you will definitely want to [give this tool a try](https://hydro.marinetechs.com/?utm_source=jfoucher&utm_campaign=launch&utm_medium=blog)

If you do, and you like it, or you hate it, or it doesn't work, or anything, your feedback would be invaluable. Contact me [by email](mailto:j_foucher@marinetechs.com) or through [this blog's contact form](/contact).