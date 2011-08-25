--- 
layout: post
title: <!--:en-->Articles populaires<!--:-->
tags: []

date: Mon Oct 11 13:07:41 +0200 2004
---
<!--:en-->

Ce plugin est une autre extension de <a href="http://randypeterman.com/StatTraq">StatTraq</a> de ma cr?ation, donc n'oubliez pas de <a href="http://randypeterman.com/StatTraq/index.php?p=14">t?l?charger StatTraq</a>. Ce plugin r?cup?re les articles les plus lus de la table de StatTraq et les affiche selon le format de votre choix.

T?l?chargez le <a href="http://jfoucher.com/source/most_popular.gz>fichier gzip</a> (ou bien <a href="http://jfoucher.com/source/most_popular>jetez un oeil au code source</a>)

D?compressez le fichier et mettez le dans votre dossier wp-content/plugins, puis activez le dans l'interface d'administration.
Pour utiliser le lugin, vous devez mettre le code ci-dessous dans votre fichier index.php.

      <?php 
     popular('cha?ne',entier);
     ?>

O? 'cha?ne' repr?sente le format de sortie que vous souhaitez obtenir. La cha?ne par d?faut est :

     '<li><a href="%u" title="%t">%t (%v views)</a></li>'

Dans cette cha?ne, %u sera remplac? par l'url de l'article, %t par son titre, et %v par le nombre de fois que cet article a ?t? lu. Il est ainsi tr?s facile de choisir le format de sortie que vous souhaitez.

Le deuxi?me param?tre (un nombre entier) d?finit le nombre d'articles que vous souhaitez afficher.

<strong>Versions</strong>

0.1: Premi?re sortie<br />
0.12: Devrait fonctionner avec toutes les structures de parmaliens, merci de me faire savoir si ce n'est pas le cas. Applique le filtre pour 'the_title'.
<!--:-->
