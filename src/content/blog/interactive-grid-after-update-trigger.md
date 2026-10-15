---
title: "Interactive Grid: After Update Trigger"
pubDate: 2020-03-29
author: "Tobias Arnhold"
description: "If you want to run a process after the \"Interactive Grid\" successfully updated all rows you can achieve this with a dynamic action. This can be necessary if…"
tags: ["apex", "interactive grid"]
source: "https://apex-at-work.blogspot.com/2020/03/interactive-grid-after-update-trigger.html"
lang: "en"
---

If you want to run a process after the "Interactive Grid" successfully updated all rows you can achieve this with a dynamic action. This can be necessary if you need to update certain columns calculated over several row in the same table you updated within the grid. Problem is to refresh the related data inside the grid as well.  
  
Example:  
You edit 3 rows for column A within your grid.  
The grid updates column A row by row.  
After that an update process should calculate a new result for column B which includes the data from all those updated 3 rows in column A.  
  
Column A   
row 1: 150   
row 2: 200  
row 3: 100  
  
Column B includes the sum of  column A  
row 1: 450   
row 2: 450   
row 3: 450    
  
All you need to do is to define your Grid like this:  
Interactive Grid > Advanced > Static ID: igYourGrid  
  
Dynamic Action Event: Save [Interactive Grid]  
Selection Type: Region  
Region: Your Grid  
Event Scope: Static  
  
Action: Execute PL/SQL Code  
custom\_pkg.after\_update\_process;  
  
Action: Execute Javascript Code  
var model = apex.region("igYourGrid").widget().interactiveGrid("getViews").grid.model;  
model.fetchRecords(model.\_data);  
  
![](/blog/interactive-grid-after-update-trigger/bild-1.png)  
  
Be aware that the custom\_pkg.after\_update\_process; process may not be executed when JavaScript errors occur.  
  
This solution is completely dynamic and does not require a page submit.   
  
--  
--  
  
**Tip of the day**  
Since all conferences get cancelled worldwide join those online conferences instead:  
**ACE's at Home: <https://itoug.it/aces-at-home/> (March 31th '20)**  
**APEX@Home: [https://asktom.oracle.com/pls/apex/f?p=100:551:::NO:551:P551\_CLASS\_ID:744](https://asktom.oracle.com/pls/apex/f?p=100:551:::NO:551:P551_CLASS_ID:744:) (April 16th '20)**
