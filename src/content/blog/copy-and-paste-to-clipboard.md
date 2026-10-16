---
title: "Copy and paste to clipboard"
pubDate: 2018-07-17
author: "Tobias Arnhold"
description: "Two ways to copy the content of a textarea to the clipboard in APEX: a dynamic action with two lines of JavaScript, or the Copy to Clipboard plugin by Dick Dral."
tags: ["apex", "plugin"]
lang: "en"
---

<img src="/blog/copy-and-paste-to-clipboard/icon.webp" width="96" height="96" alt="" />

Well I had the requirement to copy the content of a textarea into the clipboard. There are two ways to do that:

1. Build a dynamic action with custom JavaScript code: [Copy Text to Clipboard](https://www.w3schools.com/howto/howto_js_copy_clipboard.asp)

   Code example, with a dynamic action on `Click` and `Execute JavaScript Code`:

   ```js
   /* Select the text field */
   $('#P1_APEX_ITEM').select();
   /* Copy the text inside the text field */
   document.execCommand("copy");
   ```

2. Use an APEX plugin: [Copy to Clipboard (v1.1)](https://apex.world/ords/f?p=100:710:4357238555384::::P710_PLG_ID:NL.DETORA.APEX.COPY_TO_CLIPBOARD), built by Dick Dral.

Icon made by [Vitaly Gorbachev](https://www.flaticon.com/authors/vitaly-gorbachev) from [www.flaticon.com](https://www.flaticon.com/), licensed under [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).
