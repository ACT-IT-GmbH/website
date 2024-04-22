---
title: "Show all views including a specific string in the source code"
date: 2016-02-02
categories:
  - APEX
tags:
  - SQL
author: Tobias Arnhold
classes: wide
---
Seems to be a simple problem and easy to fix. Actually it is not because if you try one of these examples then you will fail:

```sql
SELECT view_name, text FROM user_views
where instr(text,'child_report_id') >= 1;
-- ORA-00932: inconsistent datatypes: expected NUMBER got LONG

SELECT view_name, text FROM user_views
where dbms_lob.instr(text,'child_report_id')>=1;
-- ORA-00997: illegal use of LONG datatype
```

But as always there is another way getting it done. All you need is a table and some SQL:
Info: The table can be dropped afterwards.

```sql
CREATE TABLE TMP_MYVIEWS as
select view_name, TO_LOB(text) text
FROM user_views;

select * 
from TMP_MYVIEWS 
where dbms_lob.instr(text,'child_report_id')>=1

drop table TMP_MYVIEWS;
```

Result:
[![show-all-views-including-specific-string-01](/assets/images/posts/2016-02-02-show-all-views-including-specific-string-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-02-02-show-all-views-including-specific-string-01.webp)


Strange is the fact that you can't do it with pure SQL:

```sql
select view_name
from
 (
  select view_name, TO_LOB(text) as text1
  FROM user_views
 )
where dbms_lob.instr(text1,'child_report_id')>=1
-- ORA-00932: inconsistent datatypes: expected - got LONG
```

***Update 05.02.2016:***   
I got a SQL only example provided by <a href="https://community.oracle.com/people/Kevan%20Gelling?customTheme=otn" rel="noopener noreferrer" target="_blank">Kevan Gelling</a>:
```sql
SELECT *
FROM user_views
WHERE INSTR( DBMS_XMLGEN.GETXML( 'SELECT text
FROM user_views
WHERE view_name = ''' || view_name || '''' ), 'child_report_id' ) > 0 ;
```