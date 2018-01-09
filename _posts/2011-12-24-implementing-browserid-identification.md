---
layout: post
title: Implementing BrowserID identification on your website
tags: [webdev, php]
excerpt: BrowserID is an identification service from Mozilla that aims to remove the need for accounts at each website we visit. I explain how to implement it on your site.
date: Thu Dec 25 15:05:13 +0200 2011
---


BrowserID [was released a few months ago](http://identity.mozilla.com/post/7616727542/introducing-browserid-a-better-way-to-sign-in) and is a new way to sign in to websites or web applications that doesn't require you to give your password each time you want to login. It doesn't even require you to register as such on each website. In that way, it is very similar to openId, but without the usability issues.

For developpers, Mozilla set up a service that provides everything you need to let your users simply login without handling any of the dirty work yourself. [http://browserid.org](http://browserid.org) is an identity provider that allows your users to create and manage their accounts across the web. One account for an infinite number of websites. Could this finally be our [universal login mechanism](http://www.codinghorror.com/blog/2010/11/your-internet-drivers-license.html)?

###[Implementing BrowserID](https://github.com/mozilla/browserid/wiki/How-to-Use-BrowserID-on-Your-Site) on your site or app is easy

#### Include the following javascript snippet in your page

{% highlight javascript %}
    <script src="https://browserid.org/include.js" type="text/javascript"></script>
{% endhighlight %}

#### Identify the user

When the user clicks on your "Login" button, a window pops up asking them to confirm that they want to login, or asking them to create a browserID account if they haven't done it yet. Once they decide that they want to login, they are redirected to your site, and the following function is called, with the assertion being passed to the callback if the login was successful
{% highlight javascript %}
    navigator.id.getVerifiedEmail(function(assertion) {
        if (assertion) {
            // This code will be invoked once the user has successfully
            // selected an email address they control to sign in with.
        } else {
            // something went wrong!  the user isn't logged in.
        }
    });
{% endhighlight %}
If the assertion is there, the user authenticated successfully. now you must verify that the assertion really is authentic, and get the relevant data from it. You *could* [do it yourself](https://wiki.mozilla.org/Identity/Verified_Email_Protocol/Latest), but if you don't have any special requirements, I recommend you just use the service provided by [http://browserid.org](http://browserid.org)

#### Verify the assertion

To do so, and once you have the `assertion`, you have to make a POST request to [http://browserid.org/verify](http://browserid.org/verify), with two parameters: the assertion and the audience, which is simply the hostname of your site. This has to be done from your server. For security reasons, it won't work if you do it as an ajax request from the user's browser. What I suggest is that you call a url on your server from the javascript callback which will be in charge of itself making the request to browserid.org. Do it as a POST request as that assertion is a *long* string. This an example implementation for the [Slim framework](http://www.slimframework.com/):
{% highlight php %}
    <?php
    $app->post('/browserid', function () use ($app) {
            $assertion=$app->request()->post('assertion');
            //get the POSTed assertion
            $post_data = array('assertion' => $assertion, 'audience' => SERVER);
            //SERVER is my site's hostname
            $r = Http::post('https://browserid.org/verify',$post_data);
            //This makes a post request to browserid.org
            $result=json_decode($r,true);
            if($result['status']=='okay'){
                handle_users($app,$result);
                //This logs the user in if we have an account for that email address,
                //or creates it otherwise
            }else{
                $msg='Could not log you in';
                $status=false;
                echo json_encode(array('message'=>$msg,'status'=>$status));
            }
        }
    );
    ?>
{% endhighlight %}

This call to the browserID API returns some json_encoded stuff, for example something like this :
{% highlight javascript %}
    {
        "status": "okay",
        "email": "lloyd@example.com",
        "audience": "https://mysite.com",
        "expires": 1308859352261,
        "issuer": "browserid.org"
    }
{% endhighlight %}

#### Login or register

If you don't get anything, or the status is not okay, something failed. Otherwise, great, your user just asked to be logged in! (or registered)

If the status was "okay", you then need to proceed to login your user (set session varibles, or whatever...) or register them (create an account in your database and then log them in)

The data returned is very basic, but allows you to check whether that user already has an account or your site or not. You are then free to ask them for additional data, such as their name, date of birth, etc...

And that's it! I'm really happy because now I can forget about email address verification, lost passwords and all the annoying stuff that having actual users imply. Let someone else do the hard work is what I say!! Especially when it integrates so well everywhere.

Oh by the way, there's a [Wordpress plugin](http://wordpress.org/extend/plugins/browserid/) for that