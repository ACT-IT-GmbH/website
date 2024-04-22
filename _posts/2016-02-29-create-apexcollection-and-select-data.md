---
title: "CREATE an APEX_COLLECTION and SELECT the data via SQL Developer"
date: 2016-02-29
categories:
  - APEX
tags:
  - APEX Collection
  - SQL Developer
author: Tobias Arnhold
classes: wide
---
[![create-apexcollection-and-select-data-01](/assets/images/posts/2016-02-29-create-apexcollection-and-select-data-01.webp){: .align-center style="width: 30%;" }](/assets/images/posts/2016-02-29-create-apexcollection-and-select-data-01.webp)

Maybe this an old hat but a lot of people don't know how to use and analyze `APEX_COLLECTION` properly. For myself it is a good reminder and saves me about 2 minutes instead of googling around.

In this example I will show you how to
- create an APEX_COLLECTION
- select the data in APEX reports
- analyze APEX_COLLECTION in SQL Developer

I will only show some basic steps. For a more detailed explanation please follow the official APEX documentation: <a href="https://docs.oracle.com/cd/E59726_01/doc.50/e39149/apex_collection.htm#AEAPI531" rel="noopener noreferrer" target="_blank">APEX 5 - APEX_COLLECTION</a>

**Create an `APEX_COLLECTION`:**

In this example I check if my collection exists and if not then I will create a new one and add some rows.

```sql
begin
 -- http://www.oracle.com/global/de/community/tipps/collections/index.html
 if not apex_collection.collection_exists('DATA_COLLECTION') then 

  apex_collection.create_collection('DATA_COLLECTION');
  apex_collection.add_member(
    p_collection_name => 'DATA_COLLECTION',
    p_c001 =>            '1',
    p_c002 =>            'APEX & SQL: THE Reporting Solution',
    p_c003 =>            'Grundsätzlich soll mit der...',
    p_c004 =>            '2015',
    p_c005 =>            'https://apex.oracle.com/pls/apex/f?p=55360:1'
  );

  apex_collection.add_member(
    p_collection_name => 'DATA_COLLECTION',
    p_c001 =>            '2',
    p_c002 =>            'Plug-Ins maßgerecht verwenden',
    p_c003 =>            'Wann macht ein Plugin Sinn...',
    p_c004 =>            '2015',
    p_c005 =>            'https://apex.oracle.com/pls/apex/f?p=80307:1'
  );

 end if;
end;
```

Next is to select the data from inside an APEX report:

```sql
select 
    c001,
    c002,
    c003,
    c004,
    c005
  from apex_collections
  where collection_name = 'DATA_COLLECTION'
```

And finally I want to check if I get the same results inside my SQL Developer:

```sql
-- Set up APEX SESSION
declare
  v_ws_id number;
  v_app_id number := &app_id;
  v_session_id number := &session_id;
begin
  select workspace_id into v_ws_id from apex_workspaces;
  wwv_flow_api.set_security_group_id(v_ws_id);
  wwv_flow.g_flow_id := v_app_id;
  wwv_flow.g_instance := v_session_id;
end;
/
-- Execute SQL
select *
from apex_collections
where collection_name = 'DATA_COLLECTION';
```

That is it.
