--- 
layout: post
title: Articles populaires
tags: []
excerpt:
date: Mon Oct 11 13:07:41 +0200 2004
---


Ce plugin est une autre extension de <a href="http://randypeterman.com/StatTraq">StatTraq</a> de ma création, donc n'oubliez pas de <a href="http://randypeterman.com/StatTraq/index.php?p=14">télécharger StatTraq</a>. Ce plugin récupère les articles les plus lus de la table de StatTraq et les affiche selon le format de votre choix.

Téléchargez le <a href="http://jfoucher.com/source/most_popular.gz">fichier gzip</a> (ou bien <a href="http://jfoucher.com/source/most_popular">jetez un oeil au code source</a>)

Décompressez le fichier et mettez le dans votre dossier wp-content/plugins, puis activez le dans l'interface d'administration.
Pour utiliser le plugin, vous devez mettre le code ci-dessous dans votre fichier index.php.

      <?php 
     popular('chaîne', entier);
     ?>

Où 'chaîne' représente le format de sortie que vous souhaitez obtenir. La chaîne par défaut est :

     '<li><a href="%u" title="%t">%t (%v views)</a></li>'

Dans cette chaîne, %u sera remplacé par l'url de l'article, %t par son titre, et %v par le nombre de fois que cet article a été lu. Il est ainsi très facile de choisir le format de sortie que vous souhaitez.

Le deuxième paramètre (un nombre entier) d?finit le nombre d'articles que vous souhaitez afficher.

<strong>Versions</strong>

0.1: Première sortie

0.12: Devrait fonctionner avec toutes les structures de parmaliens, merci de me faire savoir si ce n'est pas le cas. Applique le filtre pour 'the_title'.
