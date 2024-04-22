---
title: "Interactive Report - Column background color"
date: 2018-03-01
categories:
  - APEX
tags:
  - Interactive Report
author: Tobias Arnhold
classes: wide
---
One of my customers needed an IR where half of the report columns should be visualized in another color.

[![interactive-report-standard-column-01](/assets/images/posts/2018-03-01-interactive-report-standard-column-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2018-03-01-interactive-report-standard-column-01.webp)

It is really easy to integrate. Go into the report column attributes inside your "Page Designer" and add a "Static ID" for each column:

Column 1: rep_col_diffcolor_1   
Column 2: rep_col_diffcolor_2   
...
{: .notice}

[![interactive-report-standard-column-02](/assets/images/posts/2018-03-01-interactive-report-standard-column-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2018-03-01-interactive-report-standard-column-02.webp)

Now add this CSS snippet inside the page attributes:

```css
.a-IRR-table tr td[headers*="rep_col_diffcolor_"]
{
    background-color: #99ccff;
}
```

[![interactive-report-standard-column-03](/assets/images/posts/2018-03-01-interactive-report-standard-column-03.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2018-03-01-interactive-report-standard-column-03.webp)

The trick is to address every element by searching for the start part of the "Static ID" name.