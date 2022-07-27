---
title: Interactive Grid Automatic Position Number
date: 2022-07-20
categories:
  - APEX
tags:
  - Interactive Grid
author: Tobias Arnhold
classes: wide
excerpt: "If you want an automatic generating increasing number column in your interactive grid, follow these instrunctions"
---
[![automatic-position-number-in-interactive-grid](/assets/images/posts/2022-07-20-interactive-grid-automatic-position-number.webp){: .align-center }](/assets/images/posts/2022-07-20-interactive-grid-automatic-position-number.webp)

Create a new hidden "POSITION" item. During startup select the current max position value into that item. Add a Dynamic Action doing the magic inside your Interactive Grid. 🙂

Hidden Item: P1_CURRENT_POSITION_VALUE  
Settings > Value Protected: No
{: .notice}

Computation or Before Header Process:
{: .notice}
```sql
select 
   nvl(max(position),0)
into 
   :P1_CURRENT_POSITION_VALUE
 from YOUR_TABLE
where id = :P1_ID;
```

Interactive Grid  
Column Name: POSITION  
Type: Number Field  
This column must be the first column in your IG.  
{: .notice}

Dynamic Action Event: Row Initialization [Interactive Grid]  
Selection Type: Region  
Region: \<Your Interactive Grid Region>  
\-\-  
True Action: Set Value   
Set Type: JavaScript Expression  
{: .notice}
```js
( $(this.affectedElements[0]).val() ? $(this.affectedElements[0]).val() : $('#P1_CURRENT_POSITION_VALUE').val(parseInt($('#P1_CURRENT_POSITION_VALUE').val(),10)+1).val() )
```
Affected Elements  
Selection Type: Column(s)  
Column(s): POSITION
{: .notice}