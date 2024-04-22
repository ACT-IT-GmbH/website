---
title: "Enable save button on form change"
date: 2018-06-28
categories:
  - APEX
tags:
  - Dynamic Action
author: Tobias Arnhold
classes: wide
---
Today I had the requirement that the save button should stay disabled until a form item changed.

[![enable-save-button-on-form-change-01](/assets/images/posts/2018-06-28-enable-save-button-on-form-change-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2018-06-28-enable-save-button-on-form-change-01.webp)

After digging around I found a quite easy solution which worked well until now.

**Save Button**  
Static ID: saveBtn  
Custom Attributes: disabled  
{: .notice}

**Dynamic Action**  
Event: Page Load  
Execute Javascript Code:  
{: .notice}
```js
$('#wwvFlowForm').on('input change', function() {
    $('#saveBtn').attr('disabled', false);
});
```

Simple but effective.
