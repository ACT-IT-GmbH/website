---
title: Gemeinsam über 23 Jahre APEX Erfahrung
layout: splash
permalink: /
header:
  overlay_color: #22222299
  overlay_image: /assets/images/mann-auf-berg-vor-meer.webp
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
tagline: Profitieren auch Sie von unserem Know-How
feature_row:
  - image_path: ""
    alt: Skillmatrix der ACT! IT GmbH
    excerpt: >-
      <p>Die ACT! IT GmbH ist ein IT-Dienstleister, der sich auf die Entwicklung von individuellen Geschäftsanwendungen spezialisiert hat. Die technologische Basis bilden ein Web Frontend mit Anbindung an eine Datenbank. Dabei wird primär die Technologie "Oracle APEX" verwendet.</p>
      {: .text-justify}

      <p>Unser Ziel ist es IT-Anwendungen zu erschaffen, die einen optimalen Nutzen im gegebenen Umfeld bringen. Nicht jede hoch standardisierte Lösung, deckt alle Anforderungen an die unterstützende IT ab. Gemeinsam mit unserem Kunden entwickeln wir in iterativen Zyklen eine Lösung für individuelle Herausforderungen. Die Basis unserer Projekte bilden Sie und kein über viele Jahre ausgearbeitetes Konzept. Die Nähe zu den späteren Anwender:innen und das gemeinsame Vorhaben sind ein wesentlicher Erfolgsfaktor unserer Projekte. Hinzu kommt, dass wir nicht allein die Rolle des Entwicklers einnehmen, sondern auch als Projektleiter und Berater maßgeblich beteiligt sind.</p>
      {: .text-justify}

      <p>Wir bringen mehr als 10 Jahre Erfahrung in der agilen Projektentwicklung mit Oracle APEX mit. Und das gleich dreimal. Wir bieten einen absoluten Mehrwert hinsichtlich Qualität, Ausfallsicherheit und langfristiger Betreuung, da Sie bei uns ein Team bekommen und keinen Einzelkämpfer. Auch wenn es um die Beauftragung eines Einzelnen geht, können wir diesen Mehrwert, durch regelmäßigen internen Austausch sicherstellen.</p>
      {: .text-justify}

      <p>Wir agieren branchenunabhängig und arbeiten in allen Geschäftsbereichen, in denen eine maßgeschneiderte IT-Unterstützung benötigt wird. Wir sind spezialisiert auf Beratung, Entwicklung und Projektmanagement und möchten, dass Sie noch besser werden in dem was Sie tun.</p>
      {: .text-justify}

      <p>Lassen Sie uns gemeinsam handeln!</p>
      {: .text-justify}
feature_row2:
  - image_path: /assets/images/andre-monson.webp
    alt: Bild von André Monson
    title: André Monson
    excerpt: <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%61%6E%64%72%65%2E%6D%6F%6E%73%6F%6E%40%61%63%74%2D%69%74%2E%65%75"><span class="codeDirection">ue.ti-tca@</span><span class="displayNone">@example@</span><span class="codeDirection">nosnom.erdna</span></a><br/><span class="codeDirection">3319 2462</span><span class="displayNone">0041 2765</span><span class="codeDirection"> 251 (0) 94+</span>
  - image_path: /assets/images/christopher-berg.webp
    alt: Bild von Christopher Berg
    title: Christopher Berg
    excerpt: <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%63%68%72%69%73%74%6F%70%68%65%72%2E%62%65%72%67%40%61%63%74%2D%69%74%2E%65%75"><span class="codeDirection">ue.ti-tca@</span><span class="displayNone">@example@</span><span class="codeDirection">greb.rehpotsirhc</span></a><br/><span class="codeDirection">1740 3262</span><span class="displayNone">0041 2765</span><span class="codeDirection"> 251 (0) 94+</span>
  - image_path: /assets/images/tobias-arnhold.webp
    title: Tobias Arnhold
    alt: Bild von Tobias Arnhold
    excerpt: <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%74%6F%62%69%61%73%2E%61%72%6E%68%6F%6C%64%40%61%63%74%2D%69%74%2E%65%75"><span class="codeDirection">ue.ti-tca@</span><span class="displayNone">@example@</span><span class="codeDirection">dlohnra.saibot</span></a><br/><span class="codeDirection">5003 4848</span><span class="displayNone">0041 2765</span><span class="codeDirection"> 751 (0) 94+</span>
---
Geballte Erfahrung im Bereich Oracle Datenbanken und Oracle APEX mit einem äußerst diversen Projektportfolio machen uns zu dem perfekten Partner für Ihr nächstes Projekt.
{: .text-center}

{% include feature_row id="feature_row" type="right" %}

<script src="/assets/js/d3.min.js" charset="utf-8"></script>
<script src="/assets/js/radarChart.js"></script>
<style>
  g.axis > text.legend > tspan {
    fill: #fff;
    font-size: 1em;
  }
  g.axisWrapper > text.axisLabel {
    fill: #fff;
    font-size: 0.7em;
  }
  .tooltip {
    fill: #fff !important;
    text-shadow: 0 1px 0 #222, 1px 0 0 #222, -1px 0 0 #222, 0 -1px 0 #222;
    font-size: 1em;
  }
</style>
<script>
  var margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
  },
  width = Math.min(document.getElementsByClassName("archive__item-teaser")[0].offsetWidth - 10) - margin.left - margin.right,
  height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
  var data = [
    [
      {
        axis: "APEX",
        value: 1
      }, {
        axis: "SQL",
        value: 0.98
      }, {
        axis: "PL/SQL",
        value: 0.85
      }, {
        axis: "Javascript",
        value: 0.65
      }, {
        axis: "UI/UX",
        value: 0.6
      }, {
        axis: "APIs (REST, SOAP, JSON, XML)",
        value: 0.8
      }, {
        axis: "Cloud",
        value: 0.7
      }, {
        axis: "Beratung",
        value: 0.9
      }, {
        axis: "Projekt- management",
        value: 0.8
      }, {
        axis: "Selbstorganisation",
        value: 0.95
      }, {
        axis: "Problemlösung",
        value: 0.95
      }
    ]
  ];
  var color = d3.scale.ordinal()
      .range(["#1894ac"]);
  var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: color
  };
  RadarChart(".archive__item-teaser", data, radarChartOptions);
</script>

{% include feature_row id="feature_row2" %}
