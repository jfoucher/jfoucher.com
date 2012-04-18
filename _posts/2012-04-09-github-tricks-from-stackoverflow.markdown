---
layout: post
title: Git tips from stackoverflow
tags: [webdev, php, git]
excerpt: Sometimes git is confusing, and things that should be simple quickly look like magic incantations. Here are two such cases
hn_like_button: true
---

Here are some pretty cool and very useful git tricks I learnt  by searching or reading stackoverflow.
Most of them are operations that should be pretty easy to do, and seem pointlessly complicated. The second one is an excellent example of both the flexibility and the lack of user friendliness of the git UI

### Prevent a file from being commited, ever

[Git: Never Commit Changed Files (But still keep original revisioned.)](http://stackoverflow.com/a/8485503/210824)

{% highlight bash %}
git update-index --assume-unchanged <file>
{% endhighlight %}

To make it commitable again run

{% highlight bash %}
git update-index --no-assume-unchanged <file>
{% endhighlight %}


### Commits no yet pushed

[Viewing Unpushed Git Commits](http://stackoverflow.com/a/3338774/210824)

If you want to see all commits on all branches that aren't pushed yet, you might be looking for something like this:

{% highlight bash %}
git log --branches --not --remotes
{% endhighlight %}

And if you only want to see the most recent commit on each branch, and the branch names, this:

{% highlight bash %}
git log --branches --not --remotes --simplify-by-decoration --decorate --oneline
{% endhighlight %}