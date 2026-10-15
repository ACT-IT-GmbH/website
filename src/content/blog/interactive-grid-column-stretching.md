---
title: "Interactive Grid - Column stretching"
pubDate: 2018-12-19
author: "Tobias Arnhold"
description: "Since APEX 18.1 you can define the stretch behavior per column."
tags: ["apex", "apex 18.1", "apex examples", "interactive grid"]
source: "https://apex-at-work.blogspot.com/2018/12/interactive-grid-column-stretching_19.html"
lang: "en"
---

Since APEX 18.1 you can define the stretch behavior per column.   
  
You can choose between 3 different options:  

![](/blog/interactive-grid-column-stretching/bild-1.png)

  
**Use Report Setting**  
*The column will use the Stretch Report Setting set by the End User to define if the column should stretch or not.*  
In APEX 18.1 you have a new option to let the end user decide if the columns should be stretched or not.  
This option effects all columns by default.  
  

![](/blog/interactive-grid-column-stretching/bild-2.png)

**Never**  
*The column will not stretch and always just use the width specified. This is useful for columns with short content like Yes/No or Numbers.*  
This option will over rule "Use Report Setting" and is really good for link columns or as the documentation says: short content columns.  
  
**Always**  
*The column will always stretch, irrespective of the Stretch Report Setting set by the End User.*  
  
  
Results can look slightly different:  

![](/blog/interactive-grid-column-stretching/bild-3.png)

  

![](/blog/interactive-grid-column-stretching/bild-4.png)

  
Imho: Small enhancement with huge impact.
