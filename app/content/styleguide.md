---
title: "Styleguide"
description: "Der Styleguide dieser Seite"
url: "/styleguide/"
body_class: "grid--small"
custom_css: "styleguide"
---

Dieses Dokument ist der Styleguide für diese Website.

## Überschriften

Die Hauptüberschrift dieses Styleguides[^1] in eine `h1`. Jede Überschrift kann auch Links enthalten.

Die 2. Überschrift oben ist eine `h2`, die benutzt werden kann um Hauptsektionen auf Seitenebene zu markieren. Davon kann mehr als eine Überschrift pro Seite verwendet werden.


### Überschrift der dritten Ordnung

Die Überschrift oben ist eine `h3`, die benutzt werden kann für jede Überschrift die in der Hierarchie unter der `h2` ist.


#### Überschrift der vierten Ordnung

Die Überschrift oben ist eine `h4`, die benutzt werden kann für jede Überschrift die in der Hierarchie unter der `h3` ist.



##### Überschrift der fünften Ordnung

Die Überschrift oben ist eine `h5`, die benutzt werden kann für jede Überschrift die in der Hierarchie unter der `h4` ist.


###### Überschrift der sechsten Ordnung

Die Überschrift oben ist eine `h6`, die benutzt werden kann für jede Überschrift die in der Hierarchie unter der `h5` ist.


## Absätze

Alle Absätze werden in `p` gewrappt. Zusätzlich können `p` auch in `blockquote` gewrappt werden.

Absätze sind in der Textgestaltung einen aus einem oder mehreren Sätzen bestehenden Abschnitt eines fortlaufenden Textes. Ein Absatz ist ein Sinnzusammenhang oder ein eigenes kleines Thema. Ist dieser Gedanke ausgeführt, folgt ein neuer Absatz.


### Optimale Zeilenlänge

Die Zeilen des Textes sollten immer eine opt<span class="line-length-debug">imale Länge haben. S<span class="line-length-perfect-debug">i</span>e dürfen</span> nicht zu kurz sein, weil das für die Augen anstrengend ist so oft die Zeile zu wechseln. Aber sie dürfen auch nicht zu lang sein, da man sonst Probleme hat mit dem Auge in die nächste Zeile zu springen. Im Web werden ca. 45 bis 75 Zeichen als Ideal betrachtet, wobei es auch auf Schriftart, Schriftfarbe, Zeilenabstand und viele andere Aspekte ankommt. Aber die gut zu merkende Zahl 66 als optimale Zeilenlänge ist nicht ganz falsch. Dieser Absatz ist zwischen den Zeilen 45 und 75 markiert und der Umbruch sollte immer innerhalb der farbigen Markierung liegen. Der "perfekte" Zeilenabstand ist rot markiert.

## Sektionen-Trenner

Das `hr` kennzeichnet einen thematischen Bruch auf Absatzebene, z. B. einen Szenenwechel in einer Geschichte oder einen Übergang zu einem anderen Thema. Der folgende Auszug aus <cite>Pandora’s Star</cite> von Peter F. Hamilton zeight zwei Absätze, die einen Szenenwechel zeigen:

Dudley was ninety-two, in his second life, and fast approaching time for another rejuvenation. Despite his body having the physical age of a standard fifty-year-old, the prospect of a long degrading campaign within academia was one he regarded with dread. For a supposedly advanced civilization, the Intersolar Commonwearth could be appallingly backward at times, not to mention cruel.

<i>Maybe it won’t be that bad</i>, he told himself. The lie was comforting enough to get him through the rest of the night’s shift.

---------------------------------------

The Carlton AllLander drove Dudley home just after dawn. Like the astronomer, the vehicle was old and worn, but perfectly capable of doing its job. It had a cheap diesel engine, common enough on a semi-frontier world like Gralmond, although its drive array was a thoroughly modern photoneural processor. With its high suspension and deep-tread tyres it could plough along the dirt track to the observatory in all weather and seasons, including the metre-deep snow of Gralmond’s winters.


## Zitate

### Blockzitat

Die `blockquote` repräsentiert einen Abschnitt, der aus einer anderen Quelle zitiert.

Zusätzlich dazu kann auch das Element `cite` verwendet werden, um ein Werk zu marieren aus dem zitiert wurde.

{{% blockquote %}}
Dies ist ein Zitat.
{{% /blockquote %}}

{{% blockquote author="J.R.R. Tolkien" cite="Der Herr der Ringe" %}}
Drei Ringe den Elben, hoch im Licht. Sieben den Zwergen in ihren Hallen aus Stein. Den Sterblichen, ewig dem Tode verfalln: Neun. Ein Ring sie zu knechten, sie alle zu finden, ins Dunkel zu treiben und ewig zu binden. Im Lande Mordor, wo die Schatten drohn.
{{% /blockquote %}}

{{% blockquote author="Douglas Adams" cite="The Hichhikers Guide to the Galaxy" %}}
Flying is learning how to throw yourself at the ground and miss.
{{% /blockquote %}}

{{% blockquote author="Seth Godin" url="http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html" cite="Welcome to Island Marketing" %}}
Every interaction is both precious and an opportunity to delight.
{{% /blockquote %}}

{{% blockquote author="Winston Churchill" url="http://hansard.millbanksystems.com/commons/1947/nov/11/parliament-bill#column_206a" cite="Speech to the House of Commons" %}}
Many forms of Government have been tried, and will be tried in this world of sin and woe. No one pretends that democracy is perfect or all-wise. Indeed, it has been said that democracy is the worst form of government except all those other forms that have been tried from time to time.
{{% /blockquote %}}


### Pullquote

#### Pullquote (zentriert)

Manchmal möchte man einen kurzen Zitatblock verwenden, der nicht im Text vorkommt, oder besonders prägnant ist und daher zentriert stehen soll. Wenn ein Attribute `lang` mitgegeben wird, werden automatisch die korrekten Zitatzeichen verwendet (für Deutsch, Englisch und Japanisch).

<blockquote lang="en" class="pullquote">
  <p>No time for pessimism.</p>
</blockquote>


### Inline-Zitate

Peter sagte <q>Sie soll mir das sofort hergeben</q> und war ziemlich sauer.


#### Deutsche Zitate (verschachtelt)

Luke führte weiter aus, <q>Und sie nannte ihn einen <q>total blöd-aussehenen Idioten</q>! Ich denke ich habe eine Chance!</q> Dieser arme Idiot …


#### Englische Zitate (verschachtelt)

<p lang="en">Luke conntinued, <q>And the she called him a <q>scruffy-looking nerf-herder</q>! I think I’ve got a chance!</q> The poor naive fool …</p>


#### Japanische Zitate (verschachtelt)

<p lang="ja">彼女は<q>日本語に猫は<q>にゃん</q>と鳴く</q>と言った。</p>


## Randbemerkungen

{{< aside >}}
<h4 class="hint-headline">Überschrift</h4>
<p>Dies ist eine Randbemerkung.</p>
{{< /aside >}}

Manchmal möchte man mitten im Text etwas erklären, was nicht direkt zum Text gehört, aber das zum Verständnis des Textes beitragen kann. Diese Randbemerkungen wurden im Print üblicherweise in den Rand der Publikation gedruckt und hatten eine kleinere Schrift. Manchmal kann man diese aber auch im Text selbst stehen sehen, und sie werden durch eine andere Farbe oder einen Rand als Nebenbemerkung gekennzeichnet. Auf dieser Website stehen die Randbemerkungen (`aside`) im Rand und zwar im rechten Rand. Als Überschrift (wenn nötig) sollte minimal eine `h4` verwendet werden.


## Listen

### Geordnete Listen

Das Element `ol` kennzeichnet eine geordnete Lste, und durch CSS sind verschiedenste Nummerierungen möglich (z. B. 1, 2, 3, … a, b, c, … und so weiter).

1. Dies ist eine geordnete Liste
2. Dies ist der zweite Listeneintrag, der eine Unterliste enthält
   1. Dies ist die Unterliste, ebenfalls geordnet
   2. Sie hat zwei Einträge
3. Dies ist der dritte Listeneintrag
4. Dies ist der vierte Listeneintrag
5. Dies ist der fünfte Listeneintrag
6. Dies ist der sechste Listeneintrag
7. Dies ist der siebte Listeneintrag
8. Dies ist der achte Listeneintrag
9. Dies ist der neunste Listeneintrag
10. Dies ist der zehnte Listeneintrag
11. Dies ist der elfte Listeneintrag
12. Dies ist der zwölfte und letzte Eintrag auf dieser Liste


### Ungeordnete Listen

Das Element `ul` kennzeichnet eine ungeordnete Liste (z. B. eine Liste von Einträgen, die nur locker sortiert sind oder eine Punktliste).

- HTML
- CSS
  - Sass
    - Compass
  - LESS
  - Stylus
- JavaScript
  - Backbone.js
  - Angular.js
  - Ember.js


Manchmal soll eine Liste auch Blockelemente enthalten, üblicherweise einen Absatz oder zwei.

- HTML ist eine Auszeichnungssprache die verwendet wird, um die semantische Struktur eines Dokumentes zu schreiben.

- CSS ist eine deklarive Sprache für Stilvorlagen. Damit wird das visuelle Aussehen eines HTML-Dokumentes gesteuert.

- JavaScript ist eine Programmiersprache, die verwendet wird um Interaktionen zu einer Website hinzuzufügen oder ganze Programme für das Internet zu schreiben.


### Definitionslisten


Das Element `dl` ist ein weiterer Typ von Liste, nämlich eine Defintionsliste. Anstelle von Listeneinträgen besteht eine `dl` aus Paaren von `dt` (Defintion Term) und `dd` (Definition Description).

Dies ist eine Bezeichnung
: Dies ist die Definition für die Bezeichnung

Dies ist eine weitere Bezeichnung
: Und dies ist die Definition für die Bezeichnung
: Hier ist weitere Defintion darunter

Dies ist eine Bezeichnung
: Dies ist eine Definition für die beiden Bezeichnungen darüber

Auch wenn diese Listenform *Definitionsliste* genannt wird, kann sie auch in anderen Szenarios verwendet werden, in denen Eltern/Kind-Beziehungen vorkommen.


## Inline-Text

Es gibt eine Vielzahl von Inline-HTML-Elementen, die überall in anderen Elementen verwendet werden können.


### Links und Anker

Das Element `a` wird verwendet um Text zu verlinken, ob auf eine andere Seite, ein benanntes Fragment der aktuellen Seite oder auf einen anderen Ort im Internet:

[Gehe zur Startseite zurück](/),  [Springe zum Anfang der Seite](#top) oder besuche eine [fantastische Website im Internet](https://kogakure.de).


### Betonte Texte

Das Element `em` wird benutzt, um Betonung für Text auszuzeichnen, also z. B. wenn etwas anders ausgesprochen wird oder wichtiger ist. Um Text nur schräg zu stellen ist das Element `i` vorzuziehen:

Du *musst* einfach Negitoro Maki[^3] probieren!


### Wichtige Texte

Das Element `strong` wird verwendet, um Text mit starker Wichtigkeit auszuzeichnen. Wo Text nur fett sein soll, ist das Element `b`vorzuziehen:

Das Eis zu betreten ist **verboten**!


### Durchgestrichene Texte

Das Element `s` wird verwendet um Inhalte auszuzeichnen, die nicht länger akturat oder relevant sind. Um in Dokumenten zu markieren, dass ein Text entfernt wurde, ist das Element `del` zu verwenden.

~~Empfohlene Preisempfehlung: 3,99 € pro Flasche~~  
**Jetzt für nur noch 2,99 € pro Flasche!**


### Zitat-Quellen

Das Element `cite` wird verwendet um den Titel einer Arbeit (z. B. ein Buch, Aufsatz, Gedicht, Song, Film, TV-Show, Skulptur, Gemälde, Musical, Ausstellung etc) zu markieren.

<cite>Universal Declaration of Human Rights</cite>, United Nations, December 1948. Adopted by General Assembly resolution 217 A (III).


### Abkürzungen

Das Element `abbr` wird für abgekürzten Text verwenden, egal ob es sich um Akronyme, Initialworte oder ähnliches. Nur wenn die Abkürzung nicht in Kapitälchen geschrieben werden soll, vergibt man ein extra Klassen-Attribut.

<abbr title="British Broadcasting Corporation">BBC</abbr>, <abbr title="HyperText Markup Language">HTML</abbr>, and <abbr class="no-caps" title="Staffordshire">Staffs.</abbr>


### Zeiten

Das Element `time` wird benutzt, um entweder die Zeit auf einer 24-Stunden-Uhr zu markieren oder ein präzises Datum des Gregorianischen Kalenders zu kennzeichnen.

Die Schlacht von Sekigahara[^4] am <time datetime="1600-10-21">21. Oktober 1600</time> stellte einen Wendepunkt der japanischen Geschichte dar. Durch den Sieg gelangt es dem Haus Tokugawa, die Vormachtstellung in Japan zu sichern.


### Superskript und Subskript

Das Element `sup` kennzeichnet Superskript und das Element `sub` Subskript.

Die Koordinate des <var>i</var>ten Punktes ist (<var>x</var><var><sub>i</sub></var>, <var>y</var><var><sub>i</sub></var>). Der zehnte Punkt hat die Coordinate (<var>x<sub>10</sub></var>, <var>y<sub>10</sub></var>). Dies ist nur etwas weiterer Text der nur dafür da ist zu prüfen, ob die Zeilenhöhe stimmt.

Mathe ist eine nette Sache, manchmal möchte man mitten im Text eine Formel haben. Und sogar Berechnungen wie diese f(<var>x</var>, <var>n</var>) = log<sub>4</sub><var>x</var><sup><var>n</var></sup> sollte funktionieren und nicht die Zeilenhöhe verändern oder den Textfluß verändern.


### Kursive Texte

Das Element `i` wird benutzt um eine andere Stimme oder Stimmung zu kennzeichnen oder Text, der auf andere Weise vom Fließtext abweicht. Dies können z. B. technische Begriffe, umgangssprachliche Begriffe aus anderen Sprachen, der Name eines Schiffes oder andere Arten von Text, die üblicherweise kursiv dargestellt werden.

Es liegt eine bestimmte <i lang="fr">je ne sais quoi</i> in der Luft.


### Fette Texte

Das Element `b` wird verwendet um Worte vom Text abzuheben ohne ihnen extra Bedeutung zu geben, wie z. B. Schlüsselworte, Produktnamen oder andere Arten von Text, die üblicherweise fett dargestellt werden.

Du betrittst einen kleinen Raum. Dein <b>Schwert</b> leuchtet heller. Eine <b>Ratte</b> huscht an der Wand vorbei.


### Markierte oder hervorgehobene Texte

Das Element `mark` wird verwendet um einen <mark>Textmarker</mark> zu repräsentieren, der durch einen Text geht und stellen hervorhebt. Wenn es in einem Zitat verwendet wird, dann um eine Stelle <mark>hervorzuheben</mark>, die vorher nicht hervorgehoben war, aber auf die hingewiesen werden soll.


### Bearbeitungen

Das Element `del` wird verwendet um Text zu markieren, der nicht mehr gültig ist und entfernt werden müsste, aber aus bestimmten Gründen auf der Seite stehen bleiben muss. Sein Gegenstück, das Element `ins` markiert Text, der hinzugefügt wurde. Es kann optional ein Zeitstempel hinzugefügt werden, der anzeigt, wann die Änderung durchgeführt wurde.

Sie kaufte <del datetime="2005-05-30T13:00:00">zwei</del> <ins datetime="2005-05-30T13:00:00">fünf</ins> Paar Schuhe.


### Ruby

Das Element `ruby` hat nichts mit der Programmiersprache <cite>Ruby</cite> zu tun. Damit wird in verschiedenen asiatischen Sprachen die Aussprache von seltenen Schriftzeichen übertitelt. Im Japanischen gelten z. B. nur 1945 Zeichen als offizielle Zeichen, die im täglichen Sprachgebrauch von offiziellen Dokumenten verwendet werden dürfen. Es gibt aber viele tausend Zeichen mehr. Um auch weniger gebildeten zu ermöglichen, das Zeichen zu lesen, wird dann über diesen Zeichen Lautschrift geschrieben.

<ruby>攻殻<rp>（</rp><rt>こうかく</rt><rp>）</rp>機動隊<rp>（</rp><rt>きどうたい</rt><rp>）</rp></ruby>

Das Japanische Kino hat einige Meisterwerke hervorgebracht, sowohl in Farbe als auch in Schwarz/Weiß. Der bekannte Film 7 Samurai (<ruby>七人の侍<rp>（</rp><rt>しちにんのさむらい</rt><rp>）</rp></ruby>) von Akira Kurosawa ist einer der besten Filme der japanischen Geschichte. Der Film ist so gut, dass er sogar ein Remake erfahren hat: <cite>Die Glorreichen Sieben</cite>.


## Tabellen

Tabellen sollten verwendet werden, um tabellarische Daten anzuzeigen. Die Elemente `thead`, `tbody` und `tfoot` sind dafür da Reihen in der Tabelle zu gruppieren.


| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |


## Bilder

Ein Bild:

![Example image](https://lorempixel.com/1000/500/nightlife/)


## Videos

### YouTube-Videos

{{< youtube zY_D2ZZAZIo >}}


### Vimeo-Videos

{{< vimeo 29413609 >}}


[^1]: Ein Styleguide (oder deutsch Gestaltungsrichtlinie) beschreibt, wie bestimmte Elemente eines Druckerzeugnisses oder einer Website zu gestalten sind. Diese Richtlinien sollen ein einheitliches Erscheinungsbild verschiedener Kommunikationsmittel einer Institution oder Firma, z. B. Werbe- und Informationsmaterial, Geschäftsbriefe oder Internetauftritte, gewährleisten und so die Bildung einer Corporate Identity ermöglichen. Daneben werden Styleguides auch für die Software-Erstellung oder Produkte allgemein eingesetzt; auch hier ist das Ziel: Produkte sollen als zusammengehörig wahrgenommen werden und ggf. auch mit der verbundenen Marke assoziiert werden.
[^2]: Der American Standard Code for Information Interchange (ASCII, alternativ US-ASCII, oft [ˈæski] ausgesprochen) ist eine 7-Bit-Zeichenkodierung; sie entspricht der US-Variante von ISO 646 und dient als Grundlage für spätere, auf mehr Bits basierende Kodierungen für Zeichensätze. Die ASCII-Kodierung wurde am 17. Juni 1963 von der American Standards Association (ASA) als Standard ASA X3.4-1963 veröffentlicht und 1967 sowie zuletzt im Jahr 1968 (ANSI X3.4-1968) aktualisiert. Die Zeichenkodierung definiert 128 Zeichen, bestehend aus 33 nicht druckbaren sowie 95 druckbaren.
[^3]: Maki-Sushi (巻き寿司, Maki-Zushi, dt. *Rollen-Sushi*) sind mit einer Bambusmatte (Makisu) gerollte Stücke. Es wird für gewöhnlich in Nori eingepackt.
[^4]: Die Schlacht von Sekigahara (jap. 関ヶ原の戦い, Sekigahara no tatakai) am 21. Oktober 1600 stellte einen Wendepunkt in der japanischen Geschichte dar. Durch den Sieg in dieser Schlacht gelang es dem Haus Tokugawa, seine Vormachtstellung in Japan zu festigen. Im Laufe der nächsten fünfzig Jahre gab es zwar noch einige kleinere Aufstände, aber das Land wurde letztlich befriedet. Viele Historiker setzen den Übergang von der Sengoku-Zeit zur Edo-Zeit auf das Datum dieser Schlacht.
