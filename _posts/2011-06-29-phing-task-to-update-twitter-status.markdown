--- 
layout: post
title: A Phing task to update your Twitter status
tags: []

---
<h3>Phing and Twitter</h3>
I recently starting working with <a title="PHP build and deployment tool" href="http://www.phing.info">phing</a> to automate the build and deployement process for the web apps I'm building. I use it to compile my LESS files to CSS and minimize then, to compress and concatenate the javascript files, to optimize images using <a href="http://www.smushit.com/">smushit</a>, etc...

I like to be able to comunicate exactly what I'm doing, and thankfully Phing has a built in task to email a message to a list of recipients, which is good, but slightly old school. I wanted something that would be able to integrate readily with twitter, i.e. update my status when a build was completed. I saw <a href="http://codeinthehole.com/archives/14-Phing-task-to-update-Twitter-status.html">this post</a>, which unfortunately uses Basic Auth. As you doubtless know, <a href="http://dev.twitter.com/pages/basic_auth_shutdown">Twitter deprecated this form of authentication</a>, and now asks all users to authenticate using <a href="http://dev.twitter.com/pages/basic_to_oauth">OAuth</a>.

<h3>Download twitterOAuth library</h3>
That meant I had to roll my own phing task... However, thanks to great work by cleverer people, doing it was quite simple. Using <a href="http://abrah.am/">Abraham Williams'</a> <a href="https://github.com/abraham/twitteroauth">twitteroauth</a> library means that the coding I'd have to do was greatly reduced. Awesome, because <a href="http://www.codinghorror.com/blog/2005/08/how-to-be-lazy-dumb-and-successful.html">I aim to be lazy</a>.

The first step is to <a href="https://github.com/abraham/twitteroauth/tarball/master">download the twitteroauth library</a> from github. Extract it to a temporary folder and copy the subfolder <code lang="bash" inline="true">twitteroauth</code> to the folder where your fing tasks are stored (on my system it is <code lang="bash" inline="true">/usr/share/php/phing/tasks/my/</code>. Please note you might have to create the <code lang="bash" inline="true">my/</code> folder within <code lang="bash" inline="true">/usr/share/php/phing/tasks/</code>. You will need root privileges for these steps.

<h3>Register application with Twitter</h3>

Secondly, you need to <a href="https://dev.twitter.com/apps/new">register an application with twitter</a>, as you will need a consumer key and consumer secret later on. Please <a href="https://dev.twitter.com/apps/new">do so now</a>, and come back once you have your app data available.

<h3>Create the custom phing task</h3>

Next up is creating the actual task PHP class. Create an empty file named TwitterUpdateTask.php <code lang="bash">sudo touch /usr/share/php/phing/tasks/my/TwitterUpdateTask.php</code> and open it for editing with your favorite editor. We'll use gedit : <code lang="bash">gksu gedit /usr/share/php/phing/tasks/my/TwitterUpdateTask.php</code>

The code for this file is as shown below:

{% highlight php %}
<?php

require_once ("phing/Task.php");
require_once ("phing/tasks/my/twitteroauth/twitteroauth.php");


/* get the lines below from http://twittertokens.6px.eu/ */

define('CONSUMER_KEY', 'Your Consumer Key Here');
define('CONSUMER_SECRET', 'Your Consumer Secret Here');
define('OAUTH_TOKEN', 'Your OAuth Token Here');
define('OAUTH_TOKEN_SECRET', 'Your Oauth Token Secret Here');

class TwitterUpdateTask extends Task {

    private $message;

    /*
     * The setter for the status message
     */
    public function setMessage($str){
        $this->message=$str;
    }


    public function main(){
        /* Connect to twitter */
        $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET);
        /* Pass the status message as a parameter */
        $parameters = array('status' => $this->message);
        /* Post the data to the API endpoint */
        $status = $connection->post('statuses/update', $parameters);

        if (isset($status->error)){
            /* if there is an error, fail the build */
            throw new BuildException($status->error);
        }else{
            /* if there is no error, show a success message */
            $this->log ("Status posted to twitter");
        }
    }
}
{% endhighlight %}

<h3>Get the OAuth token and secret</h3>

Don't close this file, we still need to add the authentication data to it. You can already place your consumer key and consumer secret in the apropriate <code lang="php" inline="true">define()</code> calls (the first two lines), but if not, we'll do it now.

Navigate to <a href="http://twittertokens.6px.eu">http://twittertokens.6px.eu</a>, put your consumer data and consumer secret in the apropriate fields and click on "Sign in with Twitter". A twitter page will open asking for your confirmation. Click "Sign in" and you are redirected to http://twittertokens.6px.eu/. You should see 4 lines of code appear, that look like this:

{% highlight php %}
define('CONSUMER_KEY', 'V1UsnZJrgfhgKJFoqsQ');
define('CONSUMER_SECRET', 'UUazcBfXrWW1jcpiSU564hg654t1EMki8gzptQU');
define('OAUTH_TOKEN', '325454656-EuCudghg8tTYwKf9yjt5nhqr14i5egHJPeVRGVxQv');
define('OAUTH_TOKEN_SECRET', 'gh6854hg6tyGEvGEiEi15XmUtOmDpaONM');
{% endhighlight %}

Copy this code to the corresponding spot in the TwitterUpdateTask.php file, overwriting what's already there.

Please note though that I'm not making any claims as to how secure this is or whatever. I don't store any of your data anywhere, but if sending your application consumer token and secret worries you, find another way to get the Oauth tokens.

<h3>Create the build file</h3>

First, we define the custom task:
<code lang="xml"><taskdef name="twitterupdate" classname="phing.tasks.my.TwitterUpdateTask" /></code>

Secondly, let's create a custom target that will send a tweet with the message we want.

{% highlight xml %}
    <target name="tweet">
        <twitterupdate message="${twitter.status}" />
    </target>
{% endhighlight %}

Now we can call this task from another one, but we need to make that the twitter.status is set. Let's we have a "staging" target. Part of it could look like this:

{% highlight xml %}
    <!-- Set the timestamp to be used in the twitter update -->
    <tstamp>
        <format property="build.time" pattern="%Y-%m-%d %H:%I" />
    </tstamp>
    <property name="twitter.status" value="Staging build completed at ${build.time}" />
    <phingcall target="tweet" />
{% endhighlight %}

This will post the message to twitter, replacing the <code lang="php" inline="true">${build.time}</code> token by the actual build and time.

Do you use Phing for your webapp build and deployment? If so, please share any custom tasks you might have created.
