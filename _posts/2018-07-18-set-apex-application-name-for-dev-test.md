---
title: "Set APEX application name for Dev, Test and Prod environment in the same database"
date: 2018-07-18
categories:
  - APEX
tags:
  - Universal Theme
  - Environment
author: Tobias Arnhold
classes: wide
---
In case you have a small application where development, test and maybe also production environment are on the same database and your applications in this environment distinguish only by the application IDs. To setup a custom application name based on the ID you could do like this:

We assume our application name is *"Training room app"* defined in the `Shared Components` > `User Interface Attributes`

[![set-apex-application-name-for-dev-test-01](/assets/images/posts/2018-07-18-set-apex-application-name-for-dev-test-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2018-07-18-set-apex-application-name-for-dev-test-01.webp)

To differentiate the environments I add a dynamic action `Page Load` on Page 0.
This dynamic action is executing custom Javascript code:

```js
if ('&APP_ID.' == '200') {  
  $('.t-Header-logo').find('span').html('Training room app - <b style="color:#008A34">Test Environment</b>');  
}
else if ('&APP_ID.' == '300') {  
  $('.t-Header-logo').find('span').html('Training room app - <b style="color:#9366a5">Development Environment</b>');  
}
```

The code is changing the name of the logo area.

[![set-apex-application-name-for-dev-test-02](/assets/images/posts/2018-07-18-set-apex-application-name-for-dev-test-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2018-07-18-set-apex-application-name-for-dev-test-02.webp)
