# Zadanie testowe – Web Dev

Zadaniem jest napisanie prostej aplikacji webowej, której celem bêdzie odczytywanie oraz wyœwietlanie danych przestrzennych z pliku, kontrola przeciêcia siê obiektów oraz œledzenie aktywnego obiektu.

Finalny produkt powinien sk³adaæ siê z aplikacji w przegl¹darce, która wyœwietli mapê, naniesie na ni¹ dane wejœciowe oraz pozwoli u¿ytkownikowi na edycjê prêdkoœci zmiany aktywnego obiektu.

## Technologie

* React (z wykorzystaniem TypeScript)
* Sass
* OpenLayers
* .NET 8
* Entity Framework Core
* PostgreSQL

## Wymagania

### Frontend

* **Stworzenie mapy:** U¿yj biblioteki OpenLayers do stworzenia mapy.
* **UI:** Interfejs aplikacji powinien zawieraæ przycisk Start/Stop, textbox z mo¿liwoœci¹ wpisania liczby ca³kowitej (opóŸnienie zmiany pozycji) oraz opcjê umo¿liwiaj¹c¹ import GeoJSON-a.
* **Wczytanie toru na mapê:** Za³aduj na mapê dane poligonowe z pliku GeoJSON (`raceTrack.json`), który reprezentuje przebieg nawierzchni toru wyœcigowego.
* **Wczytanie pliku GeoJSON:** U¿ytkownik powinien mieæ mo¿liwoœæ wczytania pliku GeoJSON z danymi punktowymi do aplikacji. Mo¿liwe powinno byæ wczytanie pliku przez przeci¹gniêcie i upuszczenie (Drag & Drop) albo przez wybranie pliku z listy.
* **Animacja:** Po wpisaniu wartoœci opóŸnienia (w milisekundach) i klikniêciu przycisku "Start", na mapie powinna siê pojawiæ ikonka (`fastRaceCar.svg`), która bêdzie przechodziæ z punktu na punkt z okreœlonym opóŸnieniem. Ikona powinna byæ skierowana w kierunku jazdy, a animacja powinna siê zatrzymaæ po klikniêciu przycisku "Stop".
* **Detekcja pozycji:** Jeœli animowany punkt znajdzie siê poza obrêbem toru lub w jego œrodku, aplikacja powinna wyœwietliæ powiadomienie i zapisaæ je do bazy danych.

### Backend

* **Model danych:** Stwórz model danych, który bêdzie przechowywaæ informacje o pozycji, które wysz³y poza obrêb stadionu lub znalaz³y siê w jego œrodku, wraz z czasem wyjœcia (UTC+2).
* **API Endpoint:** Stwórz endpoint, który pozwoli na zapisanie tych danych do bazy danych PostgreSQL.
* **Integracja z Entity Framework Core:** Skonfiguruj Entity Framework Core, aby zarz¹dzaæ zapisem danych do bazy PostgreSQL.

### Dodatkowe

* **Stylowanie:** U¿yj Sass do stylowania komponentów.
* **Responsywnoœæ:** Aplikacja powinna byæ responsywna.
* **B³¹d:** Obs³u¿ b³êdy, które mog¹ wyst¹piæ podczas wczytywania plików lub komunikacji z API.

## Przydatne linki

* [Obliczanie azymutu (AGH)](https://brasil.cel.agh.edu.pl/~11sjjurek/azymut.html)
* [Dokumentacja OpenLayers](https://openlayers.org/en/latest/apidoc/)