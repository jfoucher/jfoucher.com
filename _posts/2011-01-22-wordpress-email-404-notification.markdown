--- 
layout: post
title: Wordpress 404 notification by email
excerpt: A Wordpress plugin that sends an email to the site admin when a user gets a 404 error.
tags: []

date: Sat Jan 22 23:42:45 +0100 2011
---
I couldn't find something that did just what I wanted and no more: send me an email when someone gets a 404 error on my blog. It seems pretty simple, and it really is. More than that actually. It's problably the simplest plugin I've ever written.

Check it out:
{% highlight php %}
<?php
function email_error(){
    global $wp_query;
    $location=$_SERVER['REQUEST_URI'];
    if ($wp_query-&gt;is_404){
        email_admin($location);
    }
}
add_action('get_header', 'email_error');
?>
{% endhighlight %}
This is the main part of the code, the one gets executed everytime the `get_header` hook is called. It basically just checks the $wp_query object to see if the current url gives a 404 error and then passes that url to the email_admin function

{% highlight php %}
<?php
function email_admin($location){
    $name=get_option('blogname');
    $email = get_option('admin_email');
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    $headers .= 'From: "' . $name . '" &lt;' .$email. "&gt;\r\n";
    $subject='404 error in '.$name;
    $body='A 404 error occured at the following url: '.$_SERVER['SERVER_NAME'].$location;
    @mail($email,$subject,$body,$headers);
}
?>
{% endhighlight %}

This function sets some headers for the email, such as the sender's name and email, and the subject of the message, and then sends the message. No error is shown if the message can't be sent, as this would be displayed on the page.

*UPDATE*: Finally available on the [wordpress plugin repository](http://wordpress.org/extend/plugins/email-404/)

