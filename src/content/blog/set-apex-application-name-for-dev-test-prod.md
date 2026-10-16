---
title: "Set the APEX application name for Dev, Test and Prod in the same database"
pubDate: 2018-07-18
author: "Tobias Arnhold"
description: "Development, test and production of a small application share one database and differ only by application ID. A page-zero dynamic action names the environment in the logo."
tags: ["apex", "universal theme"]
source: "https://apex-at-work.blogspot.com/2018/07/set-apex-application-name-for-dev-test.html"
lang: "en"
---

In case you have a small application where development, test and maybe also production environment are on the same database and your applications in this environment distinguish only by the application IDs. To set up a custom application name based on the ID you could do like this:

We assume our application name is *"Training room app"*, defined in `Shared Components` > `User Interface Attributes`.

![Application name in the user interface attributes](/blog/set-apex-application-name-for-dev-test-prod/bild-1.webp)

To differentiate the environments I add a dynamic action `Page Load` on Page 0. This dynamic action is executing custom JavaScript code:

```js
if ('&APP_ID.' == '200') {
  $('.t-Header-logo').find('span').html('Training room app - <b style="color:#008A34">Test Environment</b>');
}
else if ('&APP_ID.' == '300') {
  $('.t-Header-logo').find('span').html('Training room app - <b style="color:#9366a5">Development Environment</b>');
}
```

The code is changing the name of the logo area.

![Logo area with environment name](/blog/set-apex-application-name-for-dev-test-prod/bild-2.webp)
