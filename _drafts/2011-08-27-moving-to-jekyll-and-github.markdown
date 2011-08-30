Wordpress has been good to me all these years, but it's not really a hackers platform anymore. In the good old days, there were no plugins, just a myhacks.php file where we'd put all our custom functions and stuff... 

That's why I decided to move this blog to jekyll: basically, Wordpress has become too good for me, I'd spend too little time fiddling with the blog, and too much time actually writing in it.

Anyway, this is the story of my move to jekyll as it unfolds : First, I had to set My Wordpress blog's permalink structure to more or less reflect what Jekyll will provide. The only thing I had to do there was to add one line in my .htaccess to get the post ID from the old url, and redirect to the normal url for that post (index.php?p=123)

My previous permalink structure being of the form http://jfoucher.com/2011/08/537-remote-debugging-with-xdebug-and-phpstorm-on-ubuntu.html (/%year%/%monthnum%/%post_id%-%postname%.html in wordpress parlance), all I had to do is add the line below to my htaccess:

RewriteRule [0-9]{4}/[0-9]{2}/([0-9]+)- /index.php?p=$1 [R,L]

This loads the short post url, which then allows wordpress to redirect to the post with it's full url.

And with that, the first step is done. Not sure how Jekyll will be able to handle that...

The next step is to setup github to host my blog

I set up a cname for my domain (a test sub domain first) and created a pages repo on github

Then I install jekyll

## prepare the site
That means I have to copy over all the iste's assets, css, images, fonts, etc and modify the jekyll layout to be as
similar as possible to the wordpress theme I am using, so that I won't have to touch the CSS

migrate posts to jekyl

and all the rest

