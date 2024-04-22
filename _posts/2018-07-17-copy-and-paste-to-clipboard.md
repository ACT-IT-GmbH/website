---
title: "Copy and Paste to clipboard"
date: 2018-07-17
categories:
  - APEX
tags:
  - APEX Plugin
author: Tobias Arnhold
classes: wide
---
[![copy-and-paste-to-clipboard-01](/assets/images/posts/2018-07-17-copy-and-paste-to-clipboard-01.webp){: .align-center style="width: 10%;"}](/assets/images/posts/2018-07-17-copy-and-paste-to-clipboard-01.webp)[^1]

Well I had the requirement to copy the content of a textarea into the clipboard. There are two ways to do that:

1. Build a dynamic action with custom Javascript code:  
   <a href="https://www.w3schools.com/howto/howto_js_copy_clipboard.asp" rel="noopener noreferrer" target="_blank">Copy Text to Clipboard</a>

   Code example - with dynamic action on `Click` and `Execute Javascript Code`:

   ```js
   /* Select the text field */
   $('#P1_APEX_ITEM').select();
   ```

   ```js
   /* Copy the text inside the text field */
   document.execCommand("copy");
   ```

2. Use an APEX plugin:  
   <a href="https://apex.world/ords/f?p=100:710:4357238555384::::P710_PLG_ID:NL.DETORA.APEX.COPY_TO_CLIPBOARD" rel="noopener noreferrer" target="_blank">Copy to Clipboard (v1.1)</a> - build by Dick Dral


[^1]:Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" rel="noopener noreferrer" target="_blank">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" rel="noopener noreferrer" target="_blank">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" target="_blank">CC 3.0 BY</a>