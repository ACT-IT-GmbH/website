---
title: "SQL: Calculate the past time between two dates in percent"
date: 2015-11-06
categories:
  - APEX
tags:
  - SQL
author: Tobias Arnhold
classes: wide
---
Just a simple example how easy APEX can handle this kind of problem.

**Example:**

We have today the 06.11.2015 (11-06-2015) and we have two date values 01.11.2015 and 30.11.2015.  
Now I want to know how much time has past in percent since the beginning (01.11.2015):  
Result: **17 %**

**SQL Source:**

```sql
select
    date_from,
    date_until,
    case 
        when trunc(sysdate) < trunc(date_from) then -- not started
             '0 %' 
        when trunc(sysdate) > trunc(date_until) then -- end reached
             '100 %'
        else -- percent value
             trim(to_char(round(((trunc(sysdate) - trunc(date_from))/(trunc(date_until)- trunc(date_from)))*100,0))) || ' %'
     end IN_PERCENT_VALUE,
    case 
        when trunc(sysdate) < trunc(date_from) then
             0 
        when trunc(sysdate) > trunc(date_until) then
             100
        else
             round(((trunc(sysdate) - trunc(date_from))/(trunc(date_until)- trunc(date_from)))*100,0)             
    end IN_PERCENT
from (
  select
      to_date('01'||to_char(sysdate,'mm.yyyy'),'dd.mm.yyyy') as date_from,
      last_day(trunc(sysdate)) as date_until
  from dual
  union all
  select
      to_date('01'||to_char(add_months(sysdate,-1),'mm.yyyy'),'dd.mm.yyyy') as date_from,
      last_day(trunc(add_months(sysdate,-1))) as date_until
  from dual
  union all
  select
      to_date('01'||to_char(add_months(sysdate,-1),'mm.yyyy'),'dd.mm.yyyy') as date_from,
      last_day(trunc(add_months(sysdate,+1))) as date_until
  from dual
  union all
  select
      to_date('01'||to_char(add_months(sysdate,+1),'mm.yyyy'),'dd.mm.yyyy') as date_from,
      last_day(trunc(add_months(sysdate,+2))) as date_until
  from dual
  union all
  select
      to_date('01'||to_char(add_months(sysdate,-1),'mm.yyyy'),'dd.mm.yyyy') as date_from,
      trunc(sysdate+2) as date_until
  from dual
  --union all
)
order by date_from, date_until
```

Now just a little column optimization

[![sql-calculate-past-time-between-two-01](/assets/images/posts/2015-06-11-sql-calculate-past-time-between-two-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-06-11-sql-calculate-past-time-between-two-01.webp)

and the result looks like this "<a href="https://apex.oracle.com/pls/apex/f?p=73237" rel="noopener noreferrer" target="_blank">Time past between two date values in percent</a>":

[![sql-calculate-past-time-between-two-02](/assets/images/posts/2015-06-11-sql-calculate-past-time-between-two-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-06-11-sql-calculate-past-time-between-two-02.webp)