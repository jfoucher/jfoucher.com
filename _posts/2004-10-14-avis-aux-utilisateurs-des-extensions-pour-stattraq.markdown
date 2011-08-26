--- 
layout: post
title: Avis aux utilisateurs des extensions pour StatTraq
tags: []

date: Thu Oct 14 17:01:58 +0200 2004
---
<strong>Le Probl�me</strong>

C'est que si vous utilisez une structure des permaliens o� l'id du billet n'est pas pr�sente, telle que celle-ci:
{% highlight php %}
     /%year%/%monthnum%/%day%/%postname%/
{% endhighlight %}
L'id du billet n'est pas ajout� � la table de Stat Traq, ce qui fait que mon plugin <a href="http://jfoucher.com/2004/10/popular-posts-wordpress-plugin">Populaires</a> ne comprend plus ce qu'il lui arrive. La solution est en fait tr�s simple

<strong>La Solution</strong> (j'esp�re)

Dans le fichier stattraq.php, vous trouverez les lignes suivantes (25 et 26)
{% highlight php %}
    if (($p != '')){
    $p = intval($p);
{% endhighlight %}
Mais la variable {% highlight php %}$p{% endhighlight %} n'existe que si le billet est s�lectionn� par son id. S'il a �t� selectionn� par nom, {% highlight php %}$p{% endhighlight %} est nul.

Il faut donc remplacer les lignes ci-dessus par celles-la
{% highlight php %}
     if (($post->ID != '')){
     $p = intval($post->ID);
{% endhighlight %}
Et �a a l'air de marcher avec tous les sch�mas de r��criture.
<strong>Le Probl�me</strong>

C'est que si vous utilisez une structure des permaliens o� l'id du billet n'est pas pr�sente, telle que celle-ci:
{% highlight php %}
     /%year%/%monthnum%/%day%/%postname%/
{% endhighlight %}
L'id du billet n'est pas ajout� � la table de Stat Traq, ce qui fait que mon plugin <a href="http://jfoucher.com/2004/10/popular-posts-wordpress-plugin">Populaires</a> ne comprend plus ce qu'il lui arrive. La solution est en fait tr�s simple

<strong>La Solution</strong> (j'esp�re)

Dans le fichier stattraq.php, vous trouverez les lignes suivantes (25 et 26)
{% highlight php %}
    if (($p != '')){
    $p = intval($p);
{% endhighlight %}
Mais la variable {% highlight php %}$p{% endhighlight %} n'existe que si le billet est s�lectionn� par son id. S'il a �t� selectionn� par nom, {% highlight php %}$p{% endhighlight %} est nul.

Il faut donc remplacer les lignes ci-dessus par celles-la
{% highlight php %}
     if (($post->ID != '')){
     $p = intval($post->ID);
{% endhighlight %}
Et �a a l'air de marcher avec tous les sch�mas de r��criture.
