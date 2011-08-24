--- 
layout: post
title: <!--:en-->Access to MySQL import class<!--:-->
tags: []

---
<!--:en-->In my latest project <a href="http://tecknosfera.com">at work</a> I need to import data from an acess database into mySQL to be able to create an online shop from that data. Instead of importing just the database of that particular client, I created a generic PHP class that can import any Access database to MySQL.
<blockquote>
Big databases must be imported by chunks.</blockquote>
Since Access databases can get so big, the import class has to do its job by chunks, to avoid memory limits. It also needs to reload itself when it detects it is close to the time limit, all of which it now does without any problems.
We can now import (hopefully) any Access database.<!--:-->
