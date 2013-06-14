--- 
layout: post
title: "R\xE9f\xE9rents de l'articleR\xE9f\xE9rents de l'article"
tags: []

date: Wed Oct 06 17:36:09 +0200 2004
---
C'est un plugin pour <a hreflang="en" href="http://wordpress.org">Wordpress</a> Qui montre les derniers sites d'o� sont venus vos visiteurs. Vous aurez besoin du plugin <a hreflang="en" href="http://randypeterman.com/StatTraq">Stattraq</a>.

Installation :
<ol>
	<li>Téléchargez et installez <a hreflang="en" href="http://randypeterman.com/StatTraq">Stattraq</a>.</li>
	<li>Envoyer le fichier r�sultant � votre dossier /wp-content/plugins</li>
	<li>Activez le plugin dans votre interface d'administration</li>
</ol>
L'utilisation est simple :

Ajouter le code suivant dans votre fichier index.php
{% highlight php %}
post_referrers(8, "<li>", "</li>", "Pas encore...", "self");
{% endhighlight %}
o� 8 est le nombre pe pages r�f�rentes   afficher, '&lt;li&gt;' est le texte   afficher avant chaque lien, '&lt;/li&gt;' est le texte   afficher apr�s chaque lien, 'Pas encore...' est le texte   afficher s'il n'y a pas encore de page r�f�rente. La derni�re option sert   exclure certains sites : En mettant 'self' (d�fault), les r�f�rents internes ne seront pas affich�s. Sinon, vous pouvez ecrire une liste de sites � ignorer, comme ceci :
{% highlight php %}
post_referrers('', '', '', '', 'google.com yahoo.com exemple.com');
{% endhighlight %}
Pour ne pas afficher les r�f�rents sur une page o� il y a plusieurs articles, utilisez une condition comme ceci:
{% highlight php %}
if ($single) post_referrers();
{% endhighlight %}
Vous pouvez voir une d�monstration en bas des pages de ce blog, et n'h�sitez pas   laisser un commentaire si vous avez des probl�mes.

Version 0.21 : utilisation de la redirection Google pour essayer de diminuer les <a href="/?p=20">spams de r�f�rents</a>.

<a hreflang="en" href="/?p=37">English version</a>C'est un plugin pour <a hreflang="en" href="http://wordpress.org">Wordpress</a> Qui montre les derniers sites d'o� sont venus vos visiteurs. Vous aurez besoin du plugin <a hreflang="en" href="http://randypeterman.com/StatTraq">Stattraq</a>.

Installation :
<ol>
	<li>T�l�chargez et installez <a hreflang="en" href="http://randypeterman.com/StatTraq">Stattraq</a>.</li>
	<li>Envoyer le fichier r�sultant � votre dossier /wp-content/plugins</li>
	<li>Activez le plugin dans votre interface d'administration</li>
</ol>
L'utilisation est simple :

Ajouter le code suivant dans votre fichier index.php
{% highlight php %}
post_referrers(8, "<li>", "</li>", "Pas encore...", "self");
{% endhighlight %}
o� 8 est le nombre pe pages r�f�rentes   afficher, '&lt;li&gt;' est le texte   afficher avant chaque lien, '&lt;/li&gt;' est le texte   afficher apr�s chaque lien, 'Pas encore...' est le texte   afficher s'il n'y a pas encore de page r�f�rente. La derni�re option sert   exclure certains sites : En mettant 'self' (d�fault), les r�f�rents internes ne seront pas affich�s. Sinon, vous pouvez ecrire une liste de sites � ignorer, comme ceci :
{% highlight php %}
post_referrers('', '', '', '', 'google.com yahoo.com exemple.com');
{% endhighlight %}
Pour ne pas afficher les r�f�rents sur une page o� il y a plusieurs articles, utilisez une condition comme ceci:
{% highlight php %}
if ($single) post_referrers();
{% endhighlight %}
Vous pouvez voir une d�monstration en bas des pages de ce blog, et n'h�sitez pas   laisser un commentaire si vous avez des probl�mes.

Version 0.21 : utilisation de la redirection Google pour essayer de diminuer les <a href="/?p=20">spams de r�f�rents</a>.

<a hreflang="en" href="/?p=37">English version</a>
