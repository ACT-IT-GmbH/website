---
title: "Interactive Report: Column background color"
pubDate: 2018-03-01
author: "Tobias Arnhold"
description: "Give half of the columns in an Interactive Report another background colour: a static ID per column and one CSS rule that matches the ID prefix."
tags: ["apex", "interactive report"]
source: "https://apex-at-work.blogspot.com/2018/03/interactive-report-standard-column.html"
lang: "en"
---

One of my customers needed an IR where half of the report columns should be visualized in another color.

![Interactive Report with two column colours](/blog/interactive-report-column-background-color/bild-1.webp)

It is really easy to integrate. Go into the report column attributes inside your "Page Designer" and add a "Static ID" for each column:

> Column 1: `rep_col_diffcolor_1`  
> Column 2: `rep_col_diffcolor_2`  
> ...

![Static ID in the column attributes](/blog/interactive-report-column-background-color/bild-2.webp)

Now add this CSS snippet inside the page attributes:

```css
.a-IRR-table tr td[headers*="rep_col_diffcolor_"]
{
    background-color: #99ccff;
}
```

![CSS in the page attributes](/blog/interactive-report-column-background-color/bild-3.webp)

The trick is to address every element by searching for the start part of the "Static ID" name.
