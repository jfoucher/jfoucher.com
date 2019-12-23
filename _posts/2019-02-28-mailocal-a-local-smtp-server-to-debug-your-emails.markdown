--- 
layout: post
title: Mailocal, a simple SMTP server and web interface to debug your emails
tags: ['symfony', 'php', 'email', 'smtp']
excerpt: Do you know Mailtrap.io? Well this is the same, but without sending (possibly) confidential data to a third party
image: /uploads/2019/02/mailocal.png
hn_id: 19270738
date: Thu Feb 28 12:32:07 +0200 2019
---

### Testing emails

The way I used to do it is to have all emails sent to me via a configuration setting in either Symfony or Laravel. This works fine but there can be a significant delay between the moment when the email is sent and the moment it is received, which is annoying. I have heard about mailtrap, which is a hosted service that does more or less what [Mailocal](https://mailocal.jfoucher.com) does. But I'm not a fan of sending my customers' info to a third party.

### Mailocal

So over a couple of days I developed [Mailocal](https://mailocal.jfoucher.com) which is a smtp server you run locally, with a web interface to view the emails is has received.

It is built almost fully with PHP (Symfony) with only a light smattering of javascript for the front-end.
It works pretty good for the time I spent on it, although I can't be sure it will parse all emails equally well.

Obviously this is something that should not be run on a production server because I haven't looked at the security aspects much, but that's not the use case anyway.

So I hope you enjoy it and [let me know](mailto:jfoucher@gmail.com) if you find any issues.

[Mailocal documentation](https://mailocal.jfoucher.com)
[Source code](https://github.com/jfoucher/mailocal)