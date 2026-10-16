---
title: "Using dynamic tooltips in your Interactive Report"
pubDate: 2016-05-31
author: "Tobias Arnhold"
description: "Inside an Interactive Report (IR) I had a comment column. The comments in this column could become really large and the users wanted the comments to be…"
tags: ["apex", "apex 5", "dynamic actions", "sql", "tooltip", "universal theme"]
source: "https://apex-at-work.blogspot.com/2016/05/using-dynamic-tooltips-in-your.html"
lang: "en"
---

Inside an Interactive Report (IR) I had a comment column. The comments in this column could become really large and the users wanted the comments to be automatically trimmed if more then 60 characters were displayed. If the user moved the mouse above a trimmed comment then a tooltip should be display including all comment text.

My first idea was to check for existing plugins which could do this job for me. So I searched on apex.world and found the plugin called "<a href="https://apex.world/ords/f?p=100:710:::::P710_PLG_ID:DE.DANIELH.APEXTOOLTIP#" rel="noopener noreferrer" target="_blank">APEX Tooltip</a>" developed by Daniel Hochleitner.

The plugin looked great from what I could see in the example application. When I tried it in my application I found out that all comments must be applied manually in the dynamic action.   
Not exactly what I needed. :)

Luckily it was really easy to extend the plugin in a way that I could use it in my IR. To achieve what I need I had to update the javascript file: **apextooltip.js** (Line 56)

```js
// APEX Tooltip functions
// Author: Daniel Hochleitner
// Updated by Tobias Arnhold
// Version: 1.1

// global namespace
var apexTooltip = {
  // parse string to boolean
  parseBoolean: function(pString) {
    var pBoolean;
    if (pString.toLowerCase() == 'true') {
      pBoolean = true;
    }
    if (pString.toLowerCase() == 'false') {
      pBoolean = false;
    }
    if (!(pString.toLowerCase() == 'true') && !(pString.toLowerCase() == 'false')) {
      pBoolean = undefined;
    }
    return pBoolean;
  },
  // function that gets called from plugin
  showTooltip: function() {
    // plugin attributes
    var daThis = this;
    var vElementsArray = daThis.affectedElements;
    var vTheme = daThis.action.attribute01;
    var vContent = daThis.action.attribute02;
    var vContentAsHTML = apexTooltip.parseBoolean(daThis.action.attribute03);
    var vAnimation = daThis.action.attribute04;
    var vPosition = daThis.action.attribute05;
    var vDelay = parseInt(daThis.action.attribute06);
    var vTrigger = daThis.action.attribute07;
    var vMinWidth = parseInt(daThis.action.attribute08);
    var vMaxWidth = parseInt(daThis.action.attribute09);
    var vLogging = apexTooltip.parseBoolean(daThis.action.attribute10);
    // Logging
    if (vLogging) {
      console.log('showTooltip: affectedElements:', vElementsArray);
      console.log('showTooltip: Attribute Theme:', vTheme);
      console.log('showTooltip: Attribute Content:', vContent);
      console.log('showTooltip: Attribute Content as HTML:', vContentAsHTML);
      console.log('showTooltip: Attribute Animation:', vAnimation);
      console.log('showTooltip: Attribute Position:', vPosition);
      console.log('showTooltip: Attribute Delay:', vDelay);
      console.log('showTooltip: Attribute Trigger:', vTrigger);
      console.log('showTooltip: Attribute minWidth:', vMinWidth);
      console.log('showTooltip: Attribute maxWidth:', vMaxWidth);
      console.log('showTooltip: Attribute Logging:', vLogging);
    }
    for (var i = 0; i < vElementsArray.length; i++) {
      var vaffectedElement = daThis.affectedElements.eq(i);
      // call tooltipster plugin
      $(vaffectedElement).tooltipster({
        theme: vTheme,
        content: $(vaffectedElement).find('.rep_complete_comment').html(),
        contentAsHTML: vContentAsHTML,
        animation: vAnimation,
        position: vPosition,
        delay: vDelay,
        touchDevices: false,
        trigger: vTrigger,
        minWidth: vMinWidth,
        maxWidth: vMaxWidth,
        debug: vLogging,
        functionBefore: function(origin, continueTooltip) {
          $(vaffectedElement).trigger('apextooltip-show');
          continueTooltip();
        },
        functionAfter: function(origin) {
          $(vaffectedElement).trigger('apextooltip-hide');
        }
      });
    }
  }
};
```

Of course I had to update my IR as well.  
First I trimmed the comment column and added a new hidden comment column:

```sql
SELECT
-- ...
  CASE WHEN LENGTH(COMMENT_COL) > 60 THEN SUBSTR(COMMENT_COL,1,60)||'...' ELSE COMMENT_COL END AS COMMENT_COL,
  COMMENT_COL as COMPLETE_COMMENT_COL,
from my_table
```

Then I updated the column attributes:

```html
COMMENT_COL as plain text
- Static ID: rep_comment
- HTML Expression:
#COMMENT_COL#<div class="rep_complete_comment">#COMPLETE_COMMENT_COL#</div>
```

![](/blog/using-dynamic-tooltips-in-your/bild-1.webp)

`COMPLETE_COMMENT_COL` as hidden column

![](/blog/using-dynamic-tooltips-in-your/bild-2.webp)

I also had to add a small css snippet in the page attributes > CSS > Inline to hide the complete comment:
```css
.rep_complete_comment {
  display: none;
}
```

And as a last step I had to implement the tooltip plugin after refreshing the IR:
I used an advanced jQuery selector to get only those comments affected which had more then 60 characters.
```td[headers='rep_comment']:contains('...') ```

![](/blog/using-dynamic-tooltips-in-your/bild-3.webp)

The result looked like this:

![](/blog/using-dynamic-tooltips-in-your/bild-4.webp)
