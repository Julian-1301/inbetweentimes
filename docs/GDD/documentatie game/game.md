# Documentatie:
---------------

## Acties:
We zijn dit project begonnen met de volgende acties:
- TalkAction
- ExamineAction
- CustomAction

En we hebben in de loop van dit blok 2 nieuwe acties toegevoegd:
- SolveAction (Use)
- PickupAction

De **talkaction** wordt gebruikt om te praten tegen karakters en standbeelden die verspreid zijn tussen kamers. 

De **ExamineAction** wordt gebruikt om objecten te bestuderen en aanwijzingen te krijgen of progressie te maken in je spel. 

De **CustomAction** gebruiken wij alleen als een tijdelijke go-to actie binnen verbonden rooms (bijvoorbeeld tussen de EgyptRoom en de PyramidRoom) zodat je je kan verplaatsen. Echter hebben we ervoor gekozen om een andere actie te gebruiken op het moment dat je tussen de hoofdkamers van ons drieën wil verplaatsen.

De **SolveAction** werd in het begin gemaakt voor het oplossen van puzzels, maar in de loop der tijd hebben we de keuze gemaakt om het te veranderen naar een use-actie. De reden dat het nog SolveAction heet is omdat we veel bijzondere errors tegenkwamen bij het hernoemen en uiteindelijk besloten het zo te laten. De SolveAction wordt op verschillende manieren gebruikt in ons spel. Zo kan je bepaalde items gebruiken op andere items (Je kunt bijvoorbeeld een lege beker vullen met water). Maar ook gebruiken we het nog steeds om puzzels op te lossen.

De **PickupAction** wordt gebruikt om objecten die in de wereld zichtbaar zijn op te pakken en toe te voegen aan je inventory. Op deze manier krijg je soms andere resultaten als je ze inspecteert en daarnaast kan je items meenemen om te gebruiken in andere kamers.

---

## Aanpassingen:

We hebben in het begin al een aantal keuzes gemaakt om in ons spel te implementeren.

Een van de dingen die we snel merkten, zowel toen wij het spel testte als toen anderen het voor ons gingen testen was dat je inventory snel vol ging vanwege het grote aantal items die in je inventory krijgt. Hierdoor werd het action-blok aan de onderkant vrij vol en moest je scrollen om door alle objecten heen te gaan. Om dit te voorkomen hebben we het formaat van het blok aangepast zodat er drie rijen met buttons passen in plaats van twee. Ook hebben we gelet op het vaak filteren van items op het moment dat je ze niet meer nodig hebt. Hierdoor is je inventory wat leger en is het een stuk overzichterlijker dan wanneer je twintig objecten hebt die je kunt gebruiken.

Ook hebben we onze code na een tijd aangepast door meer switch-statements te gebruiken in plaats van if-else-statements. Dit hebben we gedaan omdat we in sommige scenario's een groot aantal opties hadden en de cases van een switch-statement een stuk compacter en mooier is dan een grote hoeveelheid if elses. Dit is van toepassing voor de solve-actie en de talk-actie omdat deze allebei een waarde van choiceId gebruiken en op basis daarvan een nieuw actionresult returnen.

In combinatie daarmee hebben we meer goefend met het gebruiken van arrays. Hierdoor kunnen we onze puzzels en items iets ingewikkelder maken en meer functionaliteit geven. Zo heb in sommige interactables een array genaamd choices. hier kunnen we verschillende keuzes toevoegen op basis van gegevens uit de playersession. Zo kan je als je een item hebt opgepakt misschien een extra vraag stellen aan een karakter.

Zoals eerder vernoemd hadden we een SolveAction aangemaakt. Dit hadden we gedaan om een speciale actie te hebben om puzzels op te lossen. Na een tijdje hadden we het over een use-actie en we zijn eigenlijk tot het besluit gekomen om de SolveAction te hernoemen en deze te gebruiken voor zowel items als puzzels. Dit hebben we gedaan omdat we het onnodig vonden om een losse actie te hebben voor de puzzels terwijl zowel use als solve de zelfde functie hebben. Daarnaast komen sommige puzzels pas later aan bod en het zien van de solveactie daar kan verwarring veroorzaken in dat soort gevallen.



---

## Stylistische Keuzes

We hebben met zijn alle een keuze gemaakt om voor pixel art te gaan omdat we dit allemaal wel een mooi concept vonden voor onze game, een andere reden waarom wij pixelart hebben gekozen is omdat we vonden dat je dan meer naar de gameplay gaat kijken inpv dat je naar de artwork van het spel gaat kijken.


---