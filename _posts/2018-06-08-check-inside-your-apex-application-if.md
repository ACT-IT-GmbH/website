---
title: "Check inside your APEX application if debug mode is enabled"
date: 2018-06-08
categories:
  - APEX
tags:
  - APEX Issues
  - Debug
author: Tobias Arnhold
classes: wide
---
[![check-inside-your-apex-application-if-01.webp](/assets/images/posts/2018-06-08-check-inside-your-apex-application-if-01.webp){: .align-center style="width: 10%;"}](/assets/images/posts/2018-06-08-check-inside-your-apex-application-if-01.webp)

Sounds like a simple task but whenever I have the requirement to add a region and make it conditional to check if APEX is running in debug mode. I always search for half an hour finding the right solution.

Search example on Google: "Oracle APEX check debug mode conditional PL/SQL"
Trying this or 30 different other ways it always ends up with the wrong results.

But it is so easy - Conditional PL/SQL Expression:   
`APEX_APPLICATION.G_DEBUG`

`G_DEBUG` returns true or false!   
The documentation is a bit imprecise because it says "Yes" or "No".

Anyway it is all well documented in the APEX documentation  
\> `APEX_APPLICATION` > `Global Variables`:  
<a href="https://docs.oracle.com/database/apex-18.1/AEAPI/Global-Variables.htm#AEAPI29544" rel="noopener noreferrer" target="_blank">https://docs.oracle.com/database/apex-18.1/AEAPI/Global-Variables.htm#AEAPI29544</a>