--- 
layout: post
title: Organize Series plugin database optimization
tags: []

---
<!--:en-->While looking for posts in the series, this plugin makes two database queries for each post in the series : one to find out if the post is published, and another to get the part number in the series. So if you have 30 posts in the series, you will get 60 queries from this plugin alone on each post belonging to that series. I found this very wasteful, and rewrote one function so that it only uses one database query, no matter what the number of posts in the series. I think <a href="http://unfoldingneurons.com">the author</a> should be interested...

Basically, in the file series-utility.php, replace the function
function get_series_order($posts, $postid = 0, $skip = TRUE)
by the following one :
<code lang="php">
<?php
function get_series_order($posts, $postid = 0, $skip = TRUE) {
  global $wpdb;
  if (!isset($posts)) return false; //don't have the posts array so can't do anything.

  if ( !is_array( $posts )
  $posts = array($posts);

  $series_posts = array();
  $key = 0;

  foreach ($posts as $spost) {
    if (array_key_exists('object_id', $posts)) {
      if ($key!=0){
        $spost_id .= ",".$spost['object_id'];
      }else{
        $spost_id .= $spost['object_id'];
      }
    } else {
      if ($key!=0){
        $spost_id .= ",".$spost;
      }else{
        $spost_id .= $spost;
      }
    }
    $key++;
  }

  //Optimized : 1 SQL query instead of 2* number ofposts in series//
  $results=$wpdb->get_results("SELECT $wpdb->posts.ID, $wpdb->postmeta.meta_value
  FROM $wpdb->posts LEFT JOIN $wpdb->postmeta
  ON($wpdb->posts.ID = $wpdb->postmeta.post_id)
  WHERE post_status = 'publish' AND $wpdb->posts.ID
  IN (".$spost_id.") AND ener_postmeta.meta_key='".SERIES_PART_KEY."'");
  /* 208 - fix by Matt Porter - to make sure unpublished posts are not made part of a series */
  foreach ($results as $num=>$result) {
    //echo "<h1>resultat".$result->ID.$result>meta_value."</h1>";
    $series_posts[$num]['id'] =$result->ID;
    $series_posts[$num]['part'] = $result->meta_value;
  }

  if (count($series_posts) > 1)
    usort( $series_posts, '_usort_series_by_part' );

  return $series_posts;
}
?>
</code>
And there you go, a faster blog...<!--:--><!--:fr-->While looking for posts in the series, this plugin makes two database queries for each post in the series : one to find out if the post is published, and another to get the part number in the series. So if you have 30 posts in the series, you will get 60 queries from this plugin alone on each post belonging to that series. I found this very wasteful, and rewrote one function so that it only uses one database query, no matter what the number of posts in the series. I think <a href="http://unfoldingneurons.com">the author</a> should be interested...

Basically, in the file series-utility.php, replace the function
function get_series_order($posts, $postid = 0, $skip = TRUE)
by the following one :

&lt;?php
function get_series_order($posts, $postid = 0, $skip = TRUE) {
global $wpdb;
if (!isset($posts)) return false; //don't have the posts array so can't do anything.

if ( !is_array( $posts )
$posts = array($posts);

$series_posts = array();
$key = 0;

foreach ($posts as $spost) {
if (array_key_exists('object_id', $posts)) {
if ($key!=0){
$spost_id .= ",".$spost['object_id'];
}else{
$spost_id .= $spost['object_id'];
}
} else {
if ($key!=0){
$spost_id .= ",".$spost;
}else{
$spost_id .= $spost;
}
}
$key++;
}

//Optimized : 1 SQL query instead of 2* number ofposts in series//
$results=$wpdb-&gt;get_results("SELECT $wpdb-&gt;posts.ID, $wpdb-&gt;postmeta.meta_value
FROM $wpdb-&gt;posts LEFT JOIN $wpdb-&gt;postmeta
ON($wpdb-&gt;posts.ID = $wpdb-&gt;postmeta.post_id)
WHERE post_status = 'publish' AND $wpdb-&gt;posts.ID
IN (".$spost_id.") AND ener_postmeta.meta_key='".SERIES_PART_KEY."'");
/* 208 - fix by Matt Porter - to make sure unpublished posts are not made part of a series */
foreach ($results as $num=&gt;$result) {
//echo "&lt;h1&gt;resultat".$result-&gt;ID.$result-&gt;meta_value."&lt;/h1&gt;";
$series_posts[$num]['id'] =$result-&gt;ID;
$series_posts[$num]['part'] = $result-&gt;meta_value;
}

if (count($series_posts) &gt; 1)
usort( $series_posts, '_usort_series_by_part' );

return $series_posts;
}
?&gt;

And there you go, a faster blog...<!--:-->
