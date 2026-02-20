    
# Squad Page
Ontwerp en maak samen met je team een website met NodeJS, Express, JSON en Liquid

<img width="1425" height="753" alt="thumbnail_squadpage" src="https://github.com/user-attachments/assets/b6473a01-220e-463b-8515-8f845c819a9c" />

**Live link: edu.nl/wa83d**  
<img width="150" alt="qr_wa83d" src="https://github.com/user-attachments/assets/c2465bb4-d972-4026-ae2c-35fc983814f0" />


# Titel 
## Team Radiant - Squad page
Onze opdracht was om een squad page te maken waarop je zowel kan filteren en sorteren als ugc toevoegen.
Deze moesten we ook maken aandehand van data uit een database 
Een squad page is een pagina waar je iedereen uit onze klas/ jaar kan weergeven. 
En waar je wat extra info over de squadleden te zien krijgt.

# Inhoudsopgave

# Beschrijving 
Onze site is gebasseerd op het spotify web/ laptop design.
zo zijn de squad leden in een grid weergeven(net als de albums en playlist's) , en als je op een van de squadleden klikt. 
Krijg je een vak met extra info over deze gene insliden(net zoals wanneer je een nummer opzet).
Maar natuurlijk hebben we ook onze eigen twist eraan gegeven
Zo hebben we verschillende sorteer optie's voor de kaartjes. 
Zoals op squad, naam en op id, ook kan je met de zoekbalk specifiek naar iemand te zoeken.
Om zo de gebruikers ervaring en het vinden van een bepaald kaartje zo makkelijk mogelijk te maken. 

## Showcase website & code

### Chat functie

#### Chat
https://github.com/user-attachments/assets/1839998f-2753-4444-8807-57afcbc9d8e2

#### Showcase code
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L35-L71
Hier wordt de fallback kleur groen gedefineerd indien een persoon geen fav_color heeft ingesteld.

https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L49-L54
Het neemt dan de waarde die ingevuld is in de name inputfield en maakt het lowercase zodat het makkelijker gecheckt wordt door de if statement en de opgehaalde kleur waarde toegepast kan worden.

https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L56-L60
Hier wordt gechekt met hulp van een formule of de contrast tussen de persoon zijn/haar kleur en de tekstkleur niet te laag is en past een witte of zwarte tekstkleur toe op basis van het resultaat.
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L61

### Grid layout
https://github.com/user-attachments/assets/5f611028-a407-4fae-b0c1-65e630cf2edc

#### Showcase code
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L94
Tijdens het genereren van de grid, wordt voor elke persoon de waarde fav_color inline toegepast als :hover stijl over zijn/haar kaart.

https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L122-L127
De persoon zijn/haar mugshot wordt dynamisch ingeldaden indien er een mugshot aanwezig is. In het geval een persoon geen mugshot heeft, wordt de fallback afbeelding gebruikt.

### Filter
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L97-L105

#### Showcase code
Hier wordt de persoon toegewezen aan een squad op basis van s_name zodat de variabele gebruikt kan worden in de squad filter.
Ook is het mogeljk om te sorteren op de persoon's ID, naam van A-Z en Z-A.

### Sidebar card
https://github.com/user-attachments/assets/344bfdcd-b850-4d24-88fe-aeb076d57e7f

#### Showcase code
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/e59c86743a286c7dbbb0fe6085df48d0e81b632e/views/index.liquid#L105-L115
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/5a9a180b745f41fd04b46965727d1cb11be932ec/public/script.js#L121-L133  

https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/5a9a180b745f41fd04b46965727d1cb11be932ec/public/script.js#L150-L160

# Code conventies

## Ademruimte en inspringen
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/5a9a180b745f41fd04b46965727d1cb11be932ec/views/index.liquid#L15-L40
Als team hebben wij rekening gehouden met de ademruimte van stukken code waar nodig op basis van groepen code. Elk teamlid heeft zijn/haar code ingesprongen met tabs zoals afgesproken in de teamcanvas.

## Volgorde en nesten van CSS selectors
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/5a9a180b745f41fd04b46965727d1cb11be932ec/public/style.css#L167-L191
CSS selectors zijn genest waar mogelijk en worden met behulp van tabs ingesprongen voor een nette en overzichtelijke Stylesheet.

## Nesten van media queries
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/5a9a180b745f41fd04b46965727d1cb11be932ec/public/style.css#L268-L271
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/5a9a180b745f41fd04b46965727d1cb11be932ec/public/style.css#L305-L307
https://github.com/TZGaming/connect-your-tribe-team-squad-page/blob/5a9a180b745f41fd04b46965727d1cb11be932ec/public/style.css#L348-L351
Aangezien er veel gebruik is gemaakt van layouts, is de site op zichzelf respnsive en zijn er weinig elementen waar mediaqueries voor nodig zijn.

# Kenmerken 
Dit project hebben wij gerealiseerd met HTML, CSS, JS , NodeJS,Express, liquid en json .
Het belangrijkste wat we hebben gebruikt is Node.js dit zorgt ervoor dat je data kan inladen. 
Deze ingeladen data wordt dan via de liquid omgezet tot html code. 
Je kan ook routes maken om dingen te posten. Zo hebben we aan de hand van de POST en GET functie een werkende chat kunnen maken.
De GET functie wacht eigenlijk totdat de actie waaraan hij gekoppeld is uitgevoerd wordt.
Zodat hij daarna uit de api kan ophalen die jij wilt. 

Let op voor elke post en get moet weer een nieuwe route aangemaakt worden 

De POST daarin tegen zet de data van jou site, bijvoorbeeld je antwoord van een formulier of dus je reactie in de chat om en verstuurd deze via http naar de webserver 

# Installatie 
Hoe zou je zo eenvoudig mogelijk in ons project kunnen inspringen. 
 Stap 1 : lees onze readMe nog goed door om een precieser idee te krijgen van onze site en ontwerp keuzes. En of dit project je interesseert 
 
 Stap 2 : Bezoek https://nodejs.org/en/download en download hier de Node.JS v24.13.1(lts) versie 
 
 Stap 3 : fork en clone de repo en open deze in je code editor 

 Stap 4 : open de terminal dit kan handmatig of op mac met de short cut (cmd+`)

 stap 5 : schrijf "npm install" in de terminal om zo de note modules map te downloaden 

 Stap 6 : schrijf nu "npm start" in de terminal als je dit hebt gedaan staat de server tijdelijk live op je local host.
 Hier kan je gemakkelijk zien hoe je site en de aanpassingen op de site eruit zien 

 (vergeet niet je local host elke keer opnieuw op te starten wanneer er aanpassingen zijn gemaakt in de server.js) 

# Bronnen
https://whois.fdnd.nl/docs/
https://directus.io/docs/guides/connect/query-parameters#filter
https://directus.io/docs/api/items
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
https://github.com/fdnd-task/the-startup-responsive-interactive-website/blob/main/docs/refactoring-code-conventions.md












