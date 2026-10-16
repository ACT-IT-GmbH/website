---
title: "Enable save button on form change"
pubDate: 2018-06-28
author: "Tobias Arnhold"
description: "Keep the save button disabled until a form item changes: a static ID, the disabled attribute and a three-line dynamic action on page load."
tags: ["apex", "dynamic action"]
source: "https://apex-at-work.blogspot.com/2018/06/enable-save-button-on-form-change.html"
lang: "en"
---

Today I had the requirement that the save button should stay disabled until a form item changed.

![Form with a disabled save button](/blog/enable-save-button-on-form-change/bild-1.webp)

After digging around I found a quite easy solution which worked well until now.

> **Save Button**  
> Static ID: `saveBtn`  
> Custom Attributes: `disabled`

> **Dynamic Action**  
> Event: Page Load  
> Execute JavaScript Code:

```js
$('#wwvFlowForm').on('input change', function() {
    $('#saveBtn').attr('disabled', false);
});
```

Simple but effective.
