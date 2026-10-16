---
title: "Interactive Grid: After Update Trigger"
pubDate: 2022-05-02
author: "Tobias Arnhold"
description: "Run a process after the Interactive Grid has saved all rows, then refresh the recalculated columns inside the grid. A dynamic action on the Save event does both."
tags: ["apex", "interactive grid"]
lang: "en"
---

If you want to run a process after the "Interactive Grid" successfully updated all rows you can achieve this with a dynamic action. This can be necessary if you need to update certain columns calculated over several rows in the same table you updated within the grid. Problem now is to refresh the related data inside the grid as well.

Example: You edit 3 rows for column A within your grid. The grid updates column A row by row. After that an update process should calculate a new result for column B which includes the data from all those updated 3 rows in column A.

> Column A  
> row 1: 150  
> row 2: 200  
> row 3: 100  
>
> Column B includes the sum of column A  
> row 1: 450  
> row 2: 450  
> row 3: 450

All you need to do is to define your Grid like this:

> Interactive Grid > Advanced > Static ID: `igYourGrid`

> Dynamic Action Event: Save [Interactive Grid]  
> Selection Type: Region  
> Region: Your Grid  
> Event Scope: Static

Action: Execute PL/SQL Code

```sql
custom_pkg.after_update_process;
```

Action: Execute JavaScript Code

```js
var model = apex.region("igYourGrid").widget().interactiveGrid("getViews").grid.model;
model.fetchRecords(model._data);
```

![Dynamic action on the Save event of the Interactive Grid](/blog/interactive-grid-after-update-trigger/after-update-trigger.webp)
