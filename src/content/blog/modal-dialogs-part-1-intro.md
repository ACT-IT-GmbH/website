---
title: "Modal Dialogs Part 1 - Intro"
pubDate: 2019-01-30
author: "Tobias Arnhold"
description: "In this 5 part series of blog posts I will share my understanding of how you can open modal dialogs with dynamic values."
tags: ["apex", "apex 18.1", "apex kurs"]
source: "https://apex-at-work.blogspot.com/2019/01/modal-dialogs-part-1-intro.html"
lang: "en"
---

In this 5 part series of blog posts I will share my understanding of how you can open modal dialogs with dynamic values.  

**First of all: Why would you need that?**

There are particular business cases where your modal dialog (page 2) uses data from the parent page (page 1) which was created during runtime.  
For example: Map Selector  
I want to select a certain position from a map. The map is called by a button and displayed via a modal dialog. The parameter for the default position are defined on the parent page. After I have chosen a particular position on the map the Latitude and Longitude parameter should be transmitted back towards the parent page.  
  

![](/blog/modal-dialogs-part-1-intro/bild-1.png)

  
In this introduction I will explain how you can do it with "Standard APEX" functionality.  
On my main page 10 I have several search items (like City, Street...) , two return items (Lat, Lon) and a button called SEARCH. The button executes a standard "Submit Page".  
In the processing area I add a branch "After Submit" which gets executed by the SEARCH button. The branch process will open page 11 and will transmit all search parameters.  
Info: This way opening a modal dialog may not work below APEX 18.1   
  

![](/blog/modal-dialogs-part-1-intro/bild-2.png)

  
Now the modal dialog will open. On page load a dynamic action gets executed to create the map:  
  
vAddress =  
  apex.item('P11\_CITY').getValue() + ' ' +   
  apex.item('P11\_POSTAL\_CODE').getValue() + ' ' +   
  apex.item('P11\_STREET').getValue() + ' ' +   
  apex.item('P11\_HOUSE\_NUMBER').getValue()  
  
vDiameter = apex.item("P11\_DIAMETER" ).getValue();  
  
apex.event.trigger(document, 'showOpenLayersMap', [{address: vAddress, diameter:vDiameter}]);void(0);  
  
In that little code snippet above I create a single string "address" and a diameter parameter to pass into the map function. Which is by the way created on page 0 as a custom dynamic action named "showOpenLayersMap".  
  
My showOpenLayersMap function is doing all the magic. In the moment the end user is doing a double click on a certain position inside the map a trigger executes a custom dynamic action on page 11 named "setLatLon".  
  
...  
apex.event.trigger(  
  document,   
  'setLatLon',   
  [{latitude:coordinatesItems[1], longitude:coordinatesItems[0]}]  
);  
...   
  

![](/blog/modal-dialogs-part-1-intro/bild-3.png)

  
  
This one fires 3 TRUE actions to return the Latitude and Longitude parameter to page 10:  
1. Execute JavaScript Code  
apex.item("P11\_LON" ).setValue(this.data.longitude);  
apex.item("P11\_LAT" ).setValue(this.data.latitude);  
  
2. Execute PL/SQL Code  
:P10\_LON := :P11\_LON;  
:P10\_LAT := :P11\_LAT;  
  
3. Execute JavaScript Code  
parent.location.reload();  
  
Unfortunately I couldn't find a way to send the items back to the parent page dynamically. I just couldn't react on the "Dialog Closed" event. I think it has to do with the explicit submit. The dynamic action handler has no idea about the modal dialog.  
  

![](/blog/modal-dialogs-part-1-intro/bild-4.png)

  
  
Ps.: A separate blog post about open layers and open street map will come later...  
  

**Result**

![](/blog/modal-dialogs-part-1-intro/bild-5.gif)
