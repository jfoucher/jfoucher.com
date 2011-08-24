--- 
layout: post
title: "<!--:en-->Plugin Wordpress : Page Auteur<!--:-->"
tags: []

---
<!--:en-->Cette extension de Wordpress cr?? une page sp?cifique pour chaque auteur, qui montre le nombre d'articles publi?s, et les donn?es du compte wordpress de cet utilisateur, tels que biographie, addresse du site web, etc... et optionellement l'adresse email (si vous n'avez pas peur du spam...) Il est aussi possible d'afficher un formulaire qui enverra un message   l'auteur par email, mais sans que l'adresse soit visible. 

Vous pouvez vous en servir comme d'une page '  propos' dans un blog personnel ou pour donner une pr?sentation de chaque auteur dans un site collaboratif.


Pour l'installer, t?l?chargez le fichier <a href="http://jfoucher.com/source/author.gz>gzip</a> et d?compressez-le

Envoyez  le fichier r?sultant dans votre dossier wp-content/plugins et activez le depuis l'interface d'administration.

Pour l'utiliser, ?crivez 'author()' dans votre fichier index.php, l  ou normalement appara?t le message signalamnt l'absence d'article.

Dans le fichier index.php par d?faut, ?a ressemble   ?a :

     <?php endforeach; else: ?>
     <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
     <?php endif; ?>

Remplacez le par :

     <?php endforeach; else:
     author(true, 5,false);
     endif; ?>

Le premier param?tre bool?en (optionel) vous permet de choisir si vous souhaitez afficher un formulaire de contact ou pas. 'true' est le param?tre par d?fault (affiche le formulaire).

Dans les versions 0.2+, le deuxi?me param?tre permet de d?finir le nombre de derniers articles   afficher. Etabli   0 par d?fault (ne pas afficher les derniers articles publi?s).

Pour les versions 0.22+, le troisi?me param?tre bool?en permet d'afficher ou pas l'adresse email de l'auteur. Cette option est   'false' par d?faut (ne pas afficher l'adresse email).

Les textes dans le plugin sont en Fran?ais, mais vous souhaiterez paut ?tre les changer. Ne vous g?nez pas ;)

Pour faire un lien vers la page de l'auteur, vous devez faire quelque chose comme ?a :

     <a href="index.php?author_name=<?php the_author_login(); ?>">
     <?php the_author(); ?></a>

Si vous ne pouvez ou ne voulez pas utiliser les <a href="http://httpd.apache.org/docs/misc/rewriteguide.html">RewriteRules</a> (r?gles de r??criture d'url <a href="http://httpd.apache.org">Apache</a>).

Sur ce site, j'utilise la r?gle de r??criture suivante :

    RewriteRule ^author/?(.*)/? /index.php?author_name=$1 [QSA]

Donc le lien vers la page auteur est comme ceci :

     <a href="http://jfoucher.com/author/<?php the_author_login(); ?>>
     <?php the_author(); ?></a>

Mais vous pourriez tout aussi bien utliser le r?gle suivante :

    RewriteRule ^a-propos/? /index.php?author_name=login [QSA]

en remplacant 'login' par votre propre identifiant, et cr??r un lien vers cette page comme ceci :

     <a href="http://jfoucher.com/a-propos/>A propos</a>
<!--:-->
