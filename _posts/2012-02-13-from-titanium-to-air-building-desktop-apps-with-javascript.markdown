---
layout: post
title: From Titanium to Adobe Air, or, Building Desktop Apps with Javascript
date: 2012-02-13
tags: javascript, titanium, adobe-air
---

[Vessenger](http://vessenger.com) is an app that allows closed groups such as
organizations, to chat and send documents to each other or to a central
repository. People can be divided in groups so that they can share status
updates or documents with just the required people. In some ways it is similar
to yammer, but was to be based primarily on a desktop app.

###We decide to use Titanium

After some brainstorming with the company owner, we decided that we'd make the
app available cross platform, and at least for Mac OSX and Windows. I
personally use Linux, so I also wanted to make sure that it would work on Linux
as well.  Developping two or three native apps was not a viable option, so we
decided to use a framework that would allow us to use HTML and Javascript, such
as Titanium and Adobe Air. Titanium looked like it had great support from the
community, is Open source and actively developped, so we went with that.

Developing in Titanium takes some getting used to, but is not much different to
building javascript heavy web applications. Initially, an index.html file is
loaded by Titanium, in which we load all the required javascript files. At
first I had everything in one big and quickly growing javascript file, which
although properly namespaced, was really giving me headaches just to move
around. So I split it up in several smaller files, by functionality, as I
should have done since the beginning.

Working in Titanium can be frustrating at times, and although it works pretty
well, I had to spend a lot of time looking through the documentation. After
some time, I realized that the docs for Tianium are not easy to understand, not
particularly friendly and sometimes even incomplete.

I started working on [Vessenger](http://vessenger.com) by doing most of the UI,
the status message sending and retrieving, and getting a basic version of the
chat feature working for demo purposes. The status updates was the easiest one
to build, and I added the possibility to upload files within you status update.
They can be any type of files, with images showing a thumbnail when seen by
your colleagues. All the files live on [Vessenger](http://vessenger.com)'s
servers, which makes it very easy to retrieve information at a later date, just
by looking at your (infinite) chat or status history. 

###Switching to Adobe Air

I then started working on the chat feature, which is where we noticed an issue
with the repeated server polling we were doing: as well as being suboptimal on
the server side, the was also a memory leak on the client side, which seemd to
be caused by Titanium not properly closing and/or releasing the connection
object, a problem compouded by the fact that Titanium has no method for
explicitely closing a remote connection. As I was connecting to the server
several times per second, the memory footprint of the application grew fairly
quickly. After a lot a frustration trying to make it right, we decided the
problem lay with Titanium and decided to switch to Adobe Air. Regretfully, the
latest Air version is not supported on Linux anymore, but it's possible to make
the app the app compatible with Air 2.6 to get it to run properly on linux.

> The memory used by the app could climb to 600Mb overnight...

The switch to Adobe air did not involve the complete rewrite I feared, as most
of the code is compatible and I had created some abstractions for things like
connecting to the API and storing data. Nevertheless, EncryptedLocalStorage is
great: very easy to use and has all the features needed. My only problem with
Adobe Air was the way it handled cookies: it basically did not, so I had to
create that from scratch, storing the cookies in EcryptedLocalStorage and
sending it explicitely with each and every request. In hindsight I should have
setup a dedicated server with node.js to talk to the API, and socket.io to talk
between the desktop app and the node server. I am actually implementing this
solution now for another project and I think it would be a perfect fit for
[Vessenger](http://vessenger.com) as well.

###Sort issues caused by Titanium

So by a combination of moving to Air and reducing the polling frequency for the
things that did not need to be refreshed so often, I managed to eliminate the
memory leak. Development could then continue as previously planned: I
integrated [Snaplr](http://vessenger.com/snaplr) in the file upload dialogs,
allowing the user to easily take a screenshot, annotate it and upload it along
along with his message, to be seen instantly by the people he is chatting with.
For me this is one of the killer features of [Vessenger](http://vessenger.com)  

