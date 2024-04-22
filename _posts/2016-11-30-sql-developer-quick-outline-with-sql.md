---
title: "SQL Developer: Quick Outline with SQL statements"
date: 2016-11-30
categories:
  - APEX
tags:
  - SQL
  - SQL Developer
author: Tobias Arnhold
classes: wide
---
Most of you probably know the "Quick Outline" function you have inside the SQL Developer.  
It helps you to easily jump between different functions/procedures inside a package.

[![developer-quick-outline-with-sql-01](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-01.webp)

My colleague Holger told me about a bug in SQL Developer 3.x where you could use the "Outline" view with normal SQL files, too. Unfortunately in version 4 it didn't work anymore. So he stayed with version 3 for a long while. Otherwise he would had to scroll again instead of a short jump towards a specific SQL select.

[![developer-quick-outline-with-sql-02](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-02.webp)

A few days ago he asked me again if I knew a way how to easily jump between SQL statements inside a SQL file.   
So I thought I talk to a SQL developer specialist "<a href="https://twitter.com/oraesque" rel="noopener noreferrer" target="_blank">Sabine Heimsath</a>". She knows all about those little tricks I have no clue about. But Sabine didn't know how to do it either.

My last chance was to ask on Twitter about a proper solution.

<blockquote><p lang="en" dir="ltr">Do you know about a functionality similar to &quot;Quick Outline&quot; just for a file with SQL statements to jump in between them? <a href="https://twitter.com/OracleSQLDev?ref_src=twsrc%5Etfw" rel="noopener noreferrer" target="_blank">@OracleSQLDev</a></p>&mdash; Tobias Arnhold 🌍🌈 (@tobias_arnhold) <a href="https://twitter.com/tobias_arnhold/status/801797326159380484?ref_src=twsrc%5Etfw" rel="noopener noreferrer" target="_blank">November 24, 2016</a></blockquote>

Even on Twitter nobody answered me. I guess they just started to implement such a feature. :)

Anyway yesterday Holger told me that he found a way to get it to run on SQL Developer 4.1.
Reason enough for me to share the awesome idea.

```sql
create or replace package body "" as 
/* ************************************************************************************************************************************************ */
function "SQL example 1";
/
-- SQL Statement

/* ************************************************************************************************************************************************ */
function "SQL example 2 - no character capping";
/
-- SQL Statement

/* ************************************************************************************************************************************************ */
function SQL_example_3_without_double_quote;
/
-- SQL Statement

end;
```

[![developer-quick-outline-with-sql-03](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-03.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-03.webp)

Finally a little GIF movie showing you the usage in action:

[![sql-developer-quick-outline-with-sql-04](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-04.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-11-30-sql-developer-quick-outline-with-sql-04.webp)
