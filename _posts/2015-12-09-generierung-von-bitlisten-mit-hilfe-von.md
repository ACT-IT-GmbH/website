---
title: "Generierung von Bitlisten mit Hilfe von SQL am Beispiel einer Datum zu Monat Konvertierung"
date: 2016-12-09
categories:
  - APEX
tags:
  - SQL
author: Tobias Arnhold
classes: wide
---
[![generierung-von-bitlisten-mit-hilfe-von-01](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-01.webp){: .align-center style="width: 30%;"}](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-01.webp)

Ich hatte vor kurzem die Aufgabe erhalten eine Bitliste auf Basis eines Monats zu generieren.  
Bedeutet, ich habe einen String mit 31 Zeichen der je Zeichen den Zustand 1 oder 0 einnehmen kann.
 - 1 steht für aktiv
 - 0 steht für inaktiv



*Beispieldaten:*  
```
0000000001010001000000000000000
0000000000000000111111000011010
```

Um dies anhand eines verständlichen Beispiels zu verifizieren, habe ich mir eine Dienstplan-Tabelle ausgedacht.

**Beispiel:**

Ein Arzt arbeitet an einem Tag in einem speziellen Krankenhausabteil.  
Ziel ist es, für Abteil und Arzt eine Monats-Bitliste zu erstellen.  
Heißt, an welchen Tagen im Monat arbeitet der Arzt in dem jeweiligen Abteil.

[![generierung-von-bitlisten-mit-hilfe-von-02](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-02.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-02.webp)

**Beispiel-DDL und -DML:**

```sql
SET DEFINE OFF;

-- DDL
  CREATE TABLE "DIENSTPLAN" 
   ( 
      "ORT"  VARCHAR2(100), 
      "ARZT" VARCHAR2(50), 
      "TAG"  DATE
   ) ;

-- DML
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('01.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Modesty Blaise',to_date('01.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Lucky Luke',to_date('01.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Modesty Blaise',to_date('03.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('17.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('18.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('19.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('20.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('21.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('22.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('02.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('03.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('10.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('12.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('14.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Christopher Robins',to_date('16.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Lucky Luke',to_date('17.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Lucky Luke',to_date('15.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Christopher Robins',to_date('04.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Christopher Robins',to_date('06.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Lucky Luke',to_date('10.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Lucky Luke',to_date('12.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Christopher Robins',to_date('30.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Lucky Luke',to_date('16.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Modesty Blaise',to_date('17.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Modesty Blaise',to_date('15.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Modesty Blaise',to_date('04.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Donald Duck',to_date('06.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Donald Duck',to_date('04.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Modesty Blaise',to_date('02.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('30.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Modesty Blaise',to_date('28.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('28.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('28.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Hautklinik','Dr. Theodor Pussel',to_date('27.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('27.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Modesty Blaise',to_date('27.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Lucky Luke',to_date('18.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Chirurgische Klinik','Dr. Donald Duck',to_date('19.10.2015 00:00','DD.MM.YYYY HH24:MI'));
Insert into DIENSTPLAN (ORT,ARZT,TAG) values ('Kinder- und Jugendmedizin Zentrum','Dr. Modesty Blaise',to_date('18.10.2015 00:00','DD.MM.YYYY HH24:MI'));
```

Nun habe ich mir zwei Ansätze überlegt, um dieses Problem zu lösen.

**1. SQL mit Hilfe von CONNECT BY**
   
```sql
SELECT 
  DP_MONAT.ORT,
  DP_MONAT.ARZT,
  LISTAGG(CASE WHEN DP_TAG.TAG IS NOT NULL THEN '1' ELSE '0' END , '') WITHIN GROUP (ORDER BY DP_MONAT.TAG) AS TAGESLEISTE
FROM (/* DIENSTPLAN Monat bilden */
      SELECT 
        ORT,
        ARZT,
        TAG
      FROM
       ( /* Liste mit 31 Zeilen bilden */
         SELECT TO_DATE(TO_CHAR(ROWNUM,'00')||'.10.2015','dd.mm.yyyy') TAG 
         FROM DUAL 
         CONNECT BY LEVEL <= 31
       ) 
       CROSS JOIN
       ( /* Eindeutige Liste aus DIENSTPLAN, ohne Datum */
         SELECT 
           DISTINCT 
           ORT,
           ARZT
         FROM DIENSTPLAN  
       ) 
       ORDER BY 1,2,3
      ) DP_MONAT
LEFT JOIN DIENSTPLAN DP_TAG 
ON (
      DP_MONAT.ORT = DP_TAG.ORT
      AND DP_MONAT.ARZT = DP_TAG.ARZT
      AND DP_MONAT.TAG = DP_TAG.TAG
    )
GROUP BY 
  DP_MONAT.ORT,
  DP_MONAT.ARZT
```

**2. SQL mit "ausgeklügelter" CASE WHEN Logik**

```sql
SELECT
  ORT,
  ARZT,
  CASE WHEN INSTR(TL,';01;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';02;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';03;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';04;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';05;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';06;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';07;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';08;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';09;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';10;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';11;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';12;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';13;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';14;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';15;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';16;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';17;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';18;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';19;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';20;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';21;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';22;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';23;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';24;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';25;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';26;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';27;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';28;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';29;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';30;') > 0 THEN '1' ELSE '0' END || 
  CASE WHEN INSTR(TL,';31;') > 0 THEN '1' ELSE '0' END ASTAGESLEISTE
FROM (
  SELECT 
    DP.ORT,
    DP.ARZT,
    ';'||LISTAGG(TO_CHAR(DP.TAG,'dd') , ';') WITHIN GROUP (ORDER BY DP.TAG)||';' AS TL
  FROM DIENSTPLAN DP
  GROUP BY 
    DP.ORT,
    DP.ARZT
)
```

In beiden Fällen kommt das gleiche Ergebnis raus.

[![generierung-von-bitlisten-mit-hilfe-von-03](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-03.webp){: .align-center style="width: 50%;"}](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-03.webp)

**IMHO:**  
Ich würde Lösung 2 verwenden, da hier der wenigste DB-Traffic erzeugt wird.

**Die Oracle DB kann aber noch mehr.**  
Von Haus aus bringt die Oracle DB auch eigene <a href="http://www.databasejournal.com/scripts/article.php/3610756/Bitwise-Math-and-Masking-Functions.htm" rel="noopener noreferrer" target="_blank">BIT Verarbeitungsfunktionen (BIT_AND, BIT_OR,...)</a> mit sich. Mit deren Hilfe Sie BIT Strings vergleichen können.

Hierzu ein einfaches Beispiel:
```sql
SELECT utl_raw.BIT_AND( t.A, t.B )                                                 SET_IN_A_AND_B,
       length(replace(utl_raw.BIT_AND( t.A, t.B ), '0', ''))                       SET_IN_A_AND_B_COUNT,
       utl_raw.BIT_AND( t.A, utl_raw.bit_complement(t.B) )                         ONLY_SET_IN_A,
       length(replace(utl_raw.BIT_AND( t.A, utl_raw.bit_complement(t.B) ),'0','')) ONLY_SET_IN_A_COUNT,
       utl_raw.BIT_AND( t.B, utl_raw.bit_complement(t.A) )                         ONLY_SET_IN_A,
       length(replace(utl_raw.BIT_AND( t.B, utl_raw.bit_complement(t.A) ),'0','')) ONLY_SET_IN_A_COUNT,
       utl_raw.BIT_OR( t.A, t.B )                                                  SET_IN_A_OR_B 
  FROM (SELECT '1110000001010100001000000011000' A, '0000000000000010110000000000000' B FROM dual) t
```

[![generierung-von-bitlisten-mit-hilfe-von-04](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-04.webp){: .align-center }](/assets/images/posts/2015-12-09-generierung-von-bitlisten-mit-hilfe-von-04.webp)

**Fazit:**

Sie müssen keine komplexen PL/SQL Funktionen bauen um BIT-Listen zu erstellen oder zu verarbeiten. Mit etwas SQL und der Verwendung von Oracle Funktionen ist sehr viel möglich.
