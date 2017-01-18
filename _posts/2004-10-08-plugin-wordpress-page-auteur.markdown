--- 
layout: post
title: "Plugin Wordpress : Page Auteur"
tags: []
excerpt:
date: Fri Oct 08 12:56:02 +0200 2004
---
Cette extension de Wordpress créé une page spécifique pour chaque auteur, qui montre le nombre d'articles publiés, et les données du compte wordpress de cet utilisateur, tels que biographie, addresse du site web, etc... et optionellement l'adresse email (si vous n'avez pas peur du spam...) Il est aussi possible d'afficher un formulaire qui enverra un message à l'auteur par email, mais sans que l'adresse soit visible.

Vous pouvez vous en servir comme d'une page 'à propos' dans un blog personnel ou pour donner une présentation de chaque auteur dans un site collaboratif.

Pour l'installer, téléchargez le fichier <a href="http://jfoucher.com/source/author.gz">gzip</a> et décompressez-le

Envoyez  le fichier résultant dans votre dossier wp-content/plugins et activez le depuis l'interface d'administration.

Pour l'utiliser, écrivez 'author()' dans votre fichier index.php, là où normalement apparaît le message signalant l'absence d'article.

Dans le fichier index.php par défaut, ça ressemble à ça :

     <?php endforeach; else: ?>
     <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
     <?php endif; ?>

Remplacez le par :

     <?php endforeach; else:
     author(true, 5,false);
     endif; ?>

Le premier param?tre bool?en (optionel) vous permet de choisir si vous souhaitez afficher un formulaire de contact ou pas. 'true' est le param?tre par d?fault (affiche le formulaire).

Dans les versions 0.2+, le deuxième paramètre permet de définir le nombre de derniers articles à afficher. Etabli à 0 par d?fault (ne pas afficher les derniers articles publiés).

Pour les versions 0.22+, le troisième paramètre booléen permet d'afficher ou pas l'adresse email de l'auteur. Cette option est à 'false' par d?faut (ne pas afficher l'adresse email).

Les textes dans le plugin sont en Français, mais vous souhaiterez paut être les changer. Ne vous gênez pas ;)

Pour faire un lien vers la page de l'auteur, vous devez faire quelque chose comme ?a :

     <a href="index.php?author_name=<?php the_author_login(); ?>">
     <?php the_author(); ?></a>

Si vous ne pouvez ou ne voulez pas utiliser les <a href="http://httpd.apache.org/docs/misc/rewriteguide.html">RewriteRules</a> (règles de réécriture d'url <a href="http://httpd.apache.org">Apache</a>).

Sur ce site, j'utilise la règle de réécriture suivante :

    RewriteRule ^author/?(.*)/? /index.php?author_name=$1 [QSA]

Donc le lien vers la page auteur est comme ceci :

     <a href="http://jfoucher.com/author/<?php the_author_login(); ?>">
     <?php the_author(); ?></a>

Mais vous pourriez tout aussi bien utliser le règle suivante :

    RewriteRule ^a-propos/? /index.php?author_name=login [QSA]

en remplacant 'login' par votre propre identifiant, et créér un lien vers cette page comme ceci :

     <a href="http://jfoucher.com/a-propos/">A propos</a>
