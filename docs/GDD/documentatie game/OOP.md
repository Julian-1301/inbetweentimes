# OOP leer proces:
---------------

# Polymorphism:
Wij hebben als groepje na ons gesprek een inzicht gekregen dat we wat meer konden leren over Polymorphism en dat bleek zeker zo.
Nicolai beweerde dat er geen sprake van Polymorphism zat in de code maar dat bleek helemaal zo niet te zijn, na een kort maar krachtig onderzoek over hoe dit nou precies werkt kwamen we wel op de conclusie dat we veel meer konden leren over polymorphism dan we dachten en dat het gebruik maar zeker aanwezig was in onze code.
---------------
Om maar te beginnen wat is polymorphism nou precies? Hier hebben we onderzoek naar gedaan en kwamen we uit op de volgende redenen om het te gebruiken en wat het precies doet:

Polymorfisme is een manier van coderen die objecten toestaat te worden behandeld als instanties van hun superklasse of interface, zelfs wanneer ze eigenlijk instanties zijn van een subklasse. Het maakt het mogelijk code te schrijven op een manier die flexibeler, herbruikbaarder en aanpasbaarder is.
Polymorfisme is belangrijk omdat het code toestaat te worden geschreven op een meer abstracte manier, wat betekent dat het kan werken met objecten op een hoger niveau van algemeenheid. Dit maakt de code flexibeler en beter aanpasbaar aan veranderingen in de vereisten of nieuwe toevoegingen aan het systeem.

Maar dan blijft er nog een andere vraag over. Waar hebben wij dit in onze code nou precies gebruikt? Dit hebben we ook uitgezocht en hier hebben we ook allemaal een voorbeeld voor gevonden die we hieronder hebben neergezt:

---------------
# Nicolai:

Bewijs: 
https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-b-se-bim/blok-3/wuuwaasoodii22/-/blob/main/src/api/src/nicolai/interactables/TheFinalDoor.ts?ref_type=heads

Door de implementatie van de Examine- en Pickup-interfaces de FinalDoor-klasse polymorfisch worden behandeld, waardoor deze kan worden gebruikt in verschillende contexten waar Examine- of Pickup-objecten worden verwacht. Dit bevordert de herbruikbaarheid en flexibiliteit van de code.

---------------
# Fabian: 
In de code maken wij gebruik van OOP. Tijdens de expert review hebben we laten zien en uitgelegd dat we onder andere Inkapseling en Overerving gebruiken. U merkte op dat we nog een soort OOP gebruiken die we nog niet genoemd hadden. Gezien ik was "verboden" om nog vragen te antwoorden kon ik niet noemen dat u naar wat ik dacht Polymorfisme bedoelde. Dit doen we onder andere binnen onze rooms. Alle soorten rooms worden op een uniforme manier uitgevoert. Zo heeft de klas room bijvoorbeeld aztecroom en coldwarroom die allebei de methode Sounds hebben.
Room klasse:
https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-b-se-bim/blok-3/wuuwaasoodii22/-/blob/main/src/api/src/base/gameObjects/Room.ts?ref_type=heads

Aztecroom:
https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-b-se-bim/blok-3/wuuwaasoodii22/-/blob/main/src/api/src/nicolai/rooms/AztecRoom.ts?ref_type=heads

coldwarroom:
https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-b-se-bim/blok-3/wuuwaasoodii22/-/blob/main/src/api/src/fabian/rooms/ColdWarRoom.ts?ref_type=heads

---------------

# Julian : 




