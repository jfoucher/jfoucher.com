--- 
layout: post
title: "Rérents de l'article"
tags: []
excerpt:
date: Wed Oct 06 17:36:09 +0200 2004
---
C'est un plugin pour <a hreflang="en" href="http://wordpress.org">Wordpress</a> Qui montre les derniers sites d'où sont venus vos visiteurs. Vous aurez besoin du plugin <a hreflang="en" href="http://randypeterman.com/StatTraq">Stattraq</a>.

Installation :
<ol>
	<li>Téléchargez et installez <a hreflang="en" href="http://randypeterman.com/StatTraq">Stattraq</a>.</li>
	<li>Envoyer le fichier résultant à votre dossier /wp-content/plugins</li>
	<li>Activez le plugin dans votre interface d'administration</li>
</ol>
L'utilisation est simple :

Ajouter le code suivant dans votre fichier index.php
{% highlight php %}
post_referrers(8, "<li>", "</li>", "Pas encore...", "self");
{% endhighlight %}
où 8 est le nombre pe pages référentes à afficher, '&lt;li&gt;' est le texte   afficher avant chaque lien, '&lt;/li&gt;' est le texte   afficher après chaque lien, 'Pas encore...' est le texte   afficher s'il n'y a pas encore de page référente. La derniére option sert à exclure certains sites : En mettant 'self' (défault), les référents internes ne seront pas affichés. Sinon, vous pouvez ecrire une liste de sites à ignorer, comme ceci :
{% highlight php %}
post_referrers('', '', '', '', 'google.com yahoo.com exemple.com');
{% endhighlight %}
Pour ne pas afficher les référents sur une page où il y a plusieurs articles, utilisez une condition comme ceci:
{% highlight php %}
if ($single) post_referrers();
{% endhighlight %}
Vous pouvez voir une démonstration en bas des pages de ce blog, et n'hésitez pas   laisser un commentaire si vous avez des problèmes.

Version 0.21 : utilisation de la redirection Google pour essayer de diminuer les <a href="/?p=20">spams de référents</a>.

<a hreflang="en" href="/?p=37">English version</a>
