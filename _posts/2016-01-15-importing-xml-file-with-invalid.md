---
title: "Importing XML file with invalid character 22 (U+0016)"
date: 2016-01-15
categories:
  - APEX
tags:
  - SQL
  - Development Tools
  - Tools
  - XML
author: Tobias Arnhold
classes: wide
---
I have to import a set of XML files from time to time. Most of those XML files can be imported with out any problems. But at least one file includes a special character U+0016 which occurs randomly some where inside the file.

When I try to import that file I get this ORA- error message:

```sql
ORA-31011: XML-Parsing nicht erfolgreich
ORA-19202: Fehler bei XML-Verarbeitung
LPX-00217: Ungültiges Zeichen 22 (U+0016)
Error at line 39409 aufgetreten
```

What I need to do is to remove this character and re-import the XML file again.

Luckily notepad++ brings a "regular expression" search engine which makes it easy to find:

[![importing-xml-file-with-invalid-01](/assets/images/posts/2016-01-15-importing-xml-file-with-invalid-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2016-01-15-importing-xml-file-with-invalid-01.webp)

Search for: **\x16**  
With "Search Mode" > "Extended"  
Error will be displayed as: `SYN`

The error happened in a XML file with more then 25 MB. Without notepad++ it would be hard to find. :)

BTW:   
The same solution works for those issues as well:  
`LPX-00217: Invalid character 3 (U+0003)`  
Just search for: **\x03**  
Character will be displayed as `ETX`


`LPX-00217: Invalid character 6 (U+0006)`  
Just search for: **\x06**  
Character will be displayed as `ACK`

**Update 08.07.2016:**  
I found a way to fix this character issue with some pretty SQL code:  
URL: <a href="http://stackoverflow.com/questions/2236475/finding-and-removing-non-ascii-characters-from-an-oracle-varchar2" rel="noopener noreferrer" target="_blank">Finding and removing non ascii characters from an Oracle Varchar2</a>

```sql
select
XMLTYPE(
REGEXP_REPLACE('... Your XML code....',
'[^[:print:]]',
'')
)
from dual
```