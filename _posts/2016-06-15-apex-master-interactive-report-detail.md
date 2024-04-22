---
title: "APEX Master (Interactive Report) - Detail (Modal Dialog) Form: Conditional Column Link"
date: 2016-06-15
categories:
  - APEX
tags:
  - Interactive Report
author: Tobias Arnhold
classes: wide
---
Since APEX 5 it is much easier to create master-detail pages with modal dialogs.
[![apex-master-interactive-report-detail-01](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-01.webp){: .align-right style="float: right;" }](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-01.webp)
But there is still no declarative way to create a conditional row based column link.

This blog post will show you a way how to create a conditional row based master - detail page.

1. We need some sample data:

   ```sql
   WITH MY_DATA AS
   (
   select 1 as ID, 'APEX Connect' as name, 1 as    CONDITIONAL_COL   from DUAL
   union all
   select 2 as ID, 'KScope' as name, 0 as CONDITIONAL_COL    from   DUAL
   union all
   select 3 as ID, 'DOAG' as name, 1 as CONDITIONAL_COL from    DUAL
   union all
   select 4 as ID, 'APEX-FRA Meetup Group' as name, 1 as      CONDITIONAL_COL from DUAL
   union all
   select 5 as ID, 'Oracle World' as name, 0 as    CONDITIONAL_COL   from DUAL
   )
   select 
     ID,
     NAME,
     case when nvl(CONDITIONAL_COL,99) = 1 then
       'inline-block'
     else 'none' end as CSS,
     case when nvl(CONDITIONAL_COL,99) = 1 then
       'Visited conference'
     else 'Not visited yet' end as DETAIL_COL
   from MY_DATA
   ```

   As you can see the column ```CONDITIONAL_COL``` defines the    conditional appearance.
   ```CONDITIONAL_COL = 1``` means show a detail button.
   ```CONDITIONAL_COL = 0``` means no detail button.

2. Now we can create a APEX master detail page where the "Page Mode" of the detail page is set to:
"**Modal Dialog**".

   [![apex-master-interactive-report-detail-02](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-02.webp)

   The master page gets an Interactive Report with the above select statement.

3. Now we need to configure the column attributes inside the Interactive Report:
Columns ID and NAME with be displayed as of type: "Plain Text".

   ```html
   Column CSS will not be displayed: "Hidden Column"
   Column DETAIL_COL will be displayed as of type: "Link"
    - Target:
      - Page: 2
      - Set Items: P2_ID - #ID#
    - Link Text: <span class="fa fa-search-plus" style="font-size: 160%"></span>
    - Link Attribues: class="a-Button" style="display:#CSS#;"
    ```

   We created a custom link for our detail page.

   [![apex-master-interactive-report-detail-03](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-03.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-03.webp)

   And the functionality to display the detail button conditionally is set by the column "CSS".

   [![apex-master-interactive-report-detail-04](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-04.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-04.webp)

   The result looks like this:

   [![apex-master-interactive-report-detail-05](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-05.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-05.webp)

   You can even filter the button by some readable data:

   [![apex-master-interactive-report-detail-06](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-06.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-06-15-apex-master-interactive-report-detail-06.webp)

**Security issue**:   
On the detail page you need a validation to check if the user is allowed to edit the data of the transmitted ID. An alternative way is to update the select so that no ID value will be generated if the user has no rights.

Example:

```sql
WITH MY_DATA AS
select 
  case when nvl(CONDITIONAL_COL,99) = 1 then
       ID
  else NULL end as ID,
  ID as ID_DISPLAY
  NAME,
  case when nvl(CONDITIONAL_COL,99) = 1 then
    'inline-block'
  else 'none' end as CSS,
  case when nvl(CONDITIONAL_COL,99) = 1 then
    'Visited conference'
  else 'Not visited yet' end as DETAIL_COL
from MY_DATA
```