---
title: "Interactive Grid: Validation – Check for duplicated column entries over all rows"
date: 2020-04-01
categories:
  - APEX
tags:
  - Interactive Grid
author: Tobias Arnhold
classes: wide
---
I had this situation now a few times and was always to lazy to write it down. :/

During my last task within the fabe project I hat to create a validation to check for duplicated entries inside an Interactive Grid.

[![interactive-grid-validation-check-for-duplicated-column-entries-01](/assets/images/posts/2020-04-01-interactive-grid-validation-check-for-duplicated-column-entries-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2020-04-01-interactive-grid-validation-check-for-duplicated-column-entries-01.webp)

Whenever I add "None of the above" twice, an error should occur:

[![interactive-grid-validation-check-for-duplicated-column-entries-02](/assets/images/posts/2020-04-01-interactive-grid-validation-check-for-duplicated-column-entries-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2020-04-01-interactive-grid-validation-check-for-duplicated-column-entries-02.webp)

This blog post from Lino Schilde was a good start for my final solution:
[Interactive Grid Validation](http://lschilde.blogspot.com/2017/12/interactive-grid-validation.html)

Interactive Grid Validation
Validation of Type: PL/SQL Function (returning Error Text)
Code:
```sql
declare
  v_cnt number;
begin
  -- check only if insert or update (not delete "D")
if :APEX$ROW_STATUS in ('C','U') then
  -- select only if the current row is set to Y   -- positive result if one answer was set to Y   select max(case when none_yn = 'Y' then 1 else 0 end)
  into v_cnt
  from answer
  where question_id = :P301_QUESTION_ID
  and answer_id != nvl(:ANSWER_ID,0)
  and :NONE_YN = 'Y';
  if v_cnt = 1 then
    return 'Another answer was already set up with "None of the above". You need to change and save it first.';
  end if;
end if;
end;
```
My solution used a "max" aggregation within a "case when" trick to get the right result.

Maxime Tremblay gave me a really important tip:
If I add more then one row through the IG and press save. The validation is not gone be triggered.

To fix that you to add a unique index:
```sql
create unique index ANSWER_UK1 on ANSWER (
  case when NONE_YN = 'Y' then QUESTION_ID end
);
```