--- 
layout: post
title: Wordpress 404 notification by email
excerpt: A Wordpress plugin that sends an email to the site admin when a user gets a 404 error
tags: []

date: Sat Jan 22 23:42:45 +0100 2011
---
I couldn't find something that did just what I wanted and no more: send me an email when someone gets a 404 error on my blog. It seems pretty simple, and it really is. More than that actually. It's problably the simplest plugin I've ever written.

Check it out:
{% highlight php %}
function email_error(){
    global $wp_query;
    $location=$_SERVER['REQUEST_URI'];
    if ($wp_query-&gt;is_404){
        email_admin($location);
    }
}
add_action('get_header', 'email_error');
{% endhighlight %}
This is the main part of the code, the one gets executed everytime the {% highlight php %}get_header{% endhighlight %} hook is called. It basically just checks the $wp_query object to see if the current url gives a 404 error and then passes that url to the email_admin function

{% highlight php %}
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
{% endhighlight %}

This function sets some headers for the email, such as the sender's name and email, and the subject of the message, and then sends the message. No error is shown if the message can't be sent, as this would be displayed on the page.

<strong>UPDATE</strong>: Finally available on the <a href="http://wordpress.org/extend/plugins/email-404/">wordpress plugin repository</a><p>
<p>I couldn't find something that did just what I wanted and no more: send me an email when someone gets a 404 error on my blog. It seems pretty simple, and it really is. More than that actually. It's problably the simplest plugin I've ever written.</p>
<p>Check it out:<br />
{% highlight php %}<br />
function email_error(){<br />
	global $wp_query;<br />
	$location=$_SERVER['REQUEST_URI'];</p>
<p>	if ($wp_query->is_404){<br />
		email_admin($location);<br />
	}<br />
}<br />
add_action('get_header', 'email_error');<br />
{% endhighlight %}<br />
This is the main part of the code, the one gets executed everytime the {% highlight php %}get_header{% endhighlight %} hook is called. It basically just checks the $wp_query object to see if the current url gives a 404 error and then passes that url to the email_admin function</p>
<p>{% highlight php %}<br />
function email_admin($location){<br />
	$name=get_option('blogname');<br />
	$email = get_option('admin_email');<br />
	$headers  = "MIME-Version: 1.0\r\n";<br />
	$headers .= "Content-type: text/plain; charset=UTF-8\r\n";<br />
	$headers .= 'From: "' . $name . '" <' .$email. ">\r\n";<br />
	$subject='404 error in '.$name;<br />
	$body='A 404 error occured at the following url: '.$_SERVER['SERVER_NAME'].$location;<br />
	@mail($email,$subject,$body,$headers);<br />
}<br />
{% endhighlight %}</p>
<p>This function sets some headers for the email, such as the sender's name and email, and the subject of the message, and then sends the message. No error is shown if the message can't be sent, as this would be displayed on the page.</p>
<p>Until approval by the wordpress.org guys, you can download it here: <a href='http://cdn.jfoucher.com/uploads/2011/01/email-404.zip'>Email 404 Wordpress plugin</a></p>
</p>
<p></p>
