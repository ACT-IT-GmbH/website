---
title: "Oracle SQL: Calculate the amount of workdays (Mon-Fri) between two dates"
date: 2015-03-13
categories:
  - APEX
tags:
  - SQL
author: Tobias Arnhold
classes: wide
---
I searched the net for a problem in finding a way to calculate the workdays between two date values. After I tested a couple of solutions I focused to one where I didn't necessarily need a extra select to solve that issue.

I found a post at <a href="https://asktom.oracle.com/pls/asktom/f?p=100:11:0::::P11_QUESTION_ID:185012348071#4130581022354" rel="noopener noreferrer" target="_blank">asktom.oracle.com</a>  
The described function itself looked like that:

```sql
-- Created by Sonali Kelkar from Newton, MA USA
CREATE OR REPLACE FUNCTION num_business_days(start_date IN DATE, end_date IN DATE)
   RETURN NUMBER IS
busdays NUMBER := 0;
stDate DATE;
enDate DATE;

BEGIN

stDate := TRUNC(start_date);
enDate := TRUNC(end_date);

if enDate >= stDate
then
  -- Get the absolute date range
  busdays := enDate - stDate
        -- Now subtract the weekends
        --  this statement rounds the range to whole weeks (using
        --  TRUNC and determines the number of days in the range.
        --  then it divides by 7 to get the number of weeks, and
        --  multiplies by 2 to get the number of weekend days.
     - ((TRUNC(enDate,'D')-TRUNC(stDate,'D'))/7)*2
        -- Add one to make the range inclusive
     + 1;

  /* Adjust for ending date on a saturday */
  IF TO_CHAR(enDate,'D') = '7' THEN
    busdays := busdays - 1;
  END IF;

  /* Adjust for starting date on a sunday */
  IF TO_CHAR(stDate,'D') = '1' THEN
    busdays := busdays - 1;
  END IF;
else
   busdays := 0;
END IF;

  RETURN(busdays);
END;
/
```

I did had some issues with the `TO_CHAR(stDate,'D')` logic and my German character set.
Because of this I looked further and found a solution by <a href="https://community.oracle.com/thread/2207756" rel="noopener noreferrer" target="_blank">Frank Kulash at the Oracle forum</a>:

```sql
1 + TRUNC (dt)
  - TRUNC (dt, 'IW')
```

Finally I was able creating a logic which I could use in my select. To make it more readable for you I created a from dual select:

```sql
select 
  (end_date-start_date)
  - (((TRUNC(end_date,'D')-TRUNC(start_date,'D'))/7)*2)
  + 1
  - case when (1 + TRUNC (end_date) - TRUNC (end_date, 'IW'))  = '6' then  1  else  0  end
  - case when (1 + TRUNC (end_date) - TRUNC (end_date, 'IW'))  = '7' then  2  else  0  end
  + case when (1 + TRUNC (start_date) - TRUNC (start_date, 'IW')) = '7' then  1  else  0  end
  as amount_of_workdays
from 
  ( select
    to_date('06.03.2015','dd.mm.yyyy') as start_date,
    to_date('07.03.2015','dd.mm.yyyy') as end_date
    from dual
  )
 ```

[![oracle-sql-calculate-amount-of-workdays-01](/assets/images/posts/2015-03-13-oracle-sql-calculate-amount-of-workdays-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-03-13-oracle-sql-calculate-amount-of-workdays-01.webp)
