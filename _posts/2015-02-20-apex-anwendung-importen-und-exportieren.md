---
title: "APEX Anwendungen importieren und exportieren mit Hilfe des SQL Developers"
date: 2015-02-20
categories:
  - APEX
tags:
  - SQL Developer
  - APEX Issues
  - Development Tools
author: Tobias Arnhold
classes: wide
---
Wussten Sie das der Oracle SQL Developer eine sehr gute APEX Integration bietet? Ich möchte dies Anhand der Import und Export Fähigkeit näher demonstrieren.

Im SQL Developer gibt es im Navigationsmenü neben den üblichen Verdächtigen (Tabellen, Funktionen, Triggern, ...) auch einen Punkt Namens: Application Express
Wenn Sie diesen öffnen, dann sehen Sie alle installierten APEX Anwendungen die auf das Schema referenziert sind.

**Export**  
Über die Rechte Maustaste > Schnell-DDL > In Datei schreiben... können Sie die Anwendung exportieren.

[![apex-anwendung-importen-und-exportieren-01](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-01.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-01.webp)

**Import**  
Rechte Maustaste auf Application Express, anschließend "Anwendung importieren..." auswählen.

[![apex-anwendung-importen-und-exportieren-02](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-02.webp)

Natürlich können Sie auch im SQL Developer alle Installations-Optionen wie in APEX mitgeben.

[![apex-anwendung-importen-und-exportieren-03](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-03.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-03.webp)

Und nun kommt etwas Neues!  
Wenn die Installation gestartet ist, dann können Sie die komplette Installation im Log nachverfolgen.

[![apex-anwendung-importen-und-exportieren-04](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-04.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-02-20-apex-anwendung-importen-und-exportieren-04.webp)

Diese Info hat mir schon einmal mehrere Stunden Suche gespart. Denn falls Sie es hin bekommen eine APEX Anwendung zu zerstören, so dass der Import nicht mehr funktioniert. Können Sie mit Hilfe des SQL Developer's die genaue Stelle des Fehlers herausfinden und anschließend die Anwendung korrigieren und erneut exportieren.
