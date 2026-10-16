---
title: "Interactive Grid: Automatic Position Number"
pubDate: 2022-07-20
author: "Tobias Arnhold"
description: "If you want an automatically increasing number column in your Interactive Grid, follow these instructions: a hidden item, one computation and a dynamic action on row initialization."
tags: ["apex", "interactive grid"]
source: "https://apex-at-work.blogspot.com/2022/07/interactive-grid-automatic-position-number.html"
lang: "en"
---

![Automatic position number in an Interactive Grid](/blog/interactive-grid-automatic-position-number/position-number.webp)

Create a new hidden "POSITION" item. During startup select the current max position value into that item. Add a Dynamic Action doing the magic inside your Interactive Grid.

> Hidden Item: `P1_CURRENT_POSITION_VALUE`  
> Settings > Value Protected: No

Computation or Before Header Process:

```sql
select
   nvl(max(position), 0)
into
   :P1_CURRENT_POSITION_VALUE
 from YOUR_TABLE
where id = :P1_ID;
```

> Interactive Grid  
> Column Name: POSITION  
> Type: Number Field  
> This column must be the first column in your IG.

> Dynamic Action Event: Row Initialization [Interactive Grid]  
> Selection Type: Region  
> Region: Your Interactive Grid Region  
>
> True Action: Set Value  
> Set Type: JavaScript Expression

```js
( $(this.affectedElements[0]).val() ? $(this.affectedElements[0]).val() : $('#P1_CURRENT_POSITION_VALUE').val(parseInt($('#P1_CURRENT_POSITION_VALUE').val(),10)+1).val() )
```

> Affected Elements  
> Selection Type: Column(s)  
> Column(s): POSITION
