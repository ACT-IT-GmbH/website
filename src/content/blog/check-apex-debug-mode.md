---
title: "Check inside your APEX application if debug mode is enabled"
pubDate: 2018-06-08
author: "Tobias Arnhold"
description: "A condition that is true only while APEX runs in debug mode: APEX_APPLICATION.G_DEBUG returns a boolean, not the \"Yes\" or \"No\" the documentation suggests."
tags: ["apex", "debug"]
source: "https://apex-at-work.blogspot.com/2018/06/check-inside-your-apex-application-if.html"
lang: "en"
---

Sounds like a simple task but whenever I have the requirement to add a region and make it conditional to check if APEX is running in debug mode, I always search for half an hour finding the right solution.

Search example on Google: "Oracle APEX check debug mode conditional PL/SQL". Trying this or 30 different other ways it always ends up with the wrong results.

But it is so easy. Conditional PL/SQL Expression:

```sql
APEX_APPLICATION.G_DEBUG
```

`G_DEBUG` returns true or false! The documentation is a bit imprecise because it says "Yes" or "No".

Anyway it is all well documented in the APEX documentation under `APEX_APPLICATION` > `Global Variables`: <https://docs.oracle.com/database/apex-18.1/AEAPI/Global-Variables.htm#AEAPI29544>
