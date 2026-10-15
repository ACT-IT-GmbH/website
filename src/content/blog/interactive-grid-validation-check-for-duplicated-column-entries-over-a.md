---
title: "Interactive Grid: Validation - Check for duplicated column entries over all rows"
pubDate: 2020-04-01
author: "Tobias Arnhold"
description: "I had this situation now a few times and was always to lazy to write it down. :/"
tags: ["apex", "interactive grid"]
source: "https://apex-at-work.blogspot.com/2020/04/interactive-grid-validation-check-for.html"
lang: "en"
---

I had this situation now a few times and was always to lazy to write it down. :/  
  
During my last task within the [fabe](https://fab.earth/) project I hat to create a validation to check for duplicated entries inside an Interactive Grid.  

![](/blog/interactive-grid-validation-check-for-duplicated-column-entries-over-a/bild-1.png)

Whenever I add "None of the above" twice, an error should occur:

![](/blog/interactive-grid-validation-check-for-duplicated-column-entries-over-a/bild-2.png)

This blog post from Lino Schilde was a good start for my final solution:
  

[Interactive Grid Validation](http://lschilde.blogspot.com/2017/12/interactive-grid-validation.html)

Interactive Grid Validation

Validation of Type: PL/SQL Function (returning Error Text)

Code:

declare  
  v\_cnt number;  
begin

-- check only if insert or update (not delete "D")   
if :APEX$ROW\_STATUS in ('C','U') then

-- select only if the current row is set to Y

-- positive result if one answer was set to Y

select max(case when none\_yn = 'Y' then 1 else 0 end)  
  into v\_cnt  
  from answer  
  where question\_id = :P301\_QUESTION\_ID  
  and answer\_id != nvl(:ANSWER\_ID,0)  
  and :NONE\_YN = 'Y';  
    
  if v\_cnt = 1 then  
    return 'Another answer was already set up with "None of the above". You need to change and save it first.';  
  end if;  
  
end if;  
end;

My solution used a "max" aggregation within a "case when" trick to get the right result.  
  
Maxime Tremblay gave me a really important tip:  
If I add more then one row through the IG and press save. The validation is not gone be triggered.  
  
To fix that you to add a unique index:  
create unique index ANSWER\_UK1 on ANSWER (  
  case when NONE\_YN = 'Y' then QUESTION\_ID end  
);

> had to had a look at it :P  
>   
> used this unique index:  
> create unique index ANSWERS\_UK1 on ANSWERS (  
>  case when NONE\_YN = 'Y' then QUESTION\_ID end  
> );  
>   
> obviously, the error handling function would display a better/nicer error message to the user [pic.twitter.com/u6bLWWpvjz](https://t.co/u6bLWWpvjz)
>
> — askMax - Maxime Tremblay (@askMaxSolutions) [April 2, 2020](https://twitter.com/askMaxSolutions/status/1245532558919708672?ref_src=twsrc%5Etfw)

--

--

  
**Tip of the day**  
All those meeting clients (Skype, Zoom, Hangouts ...) can also be used for APEX friends and beer meetups. #beer #orclapex  

![](/blog/interactive-grid-validation-check-for-duplicated-column-entries-over-a/bild-3.png)
