# Zadanie testowe – Web Dev

Zadaniem jest napisanie prostej aplikacji webowej, której celem będzie odczytywanie oraz wyświetlanie danych przestrzennych z pliku, kontrola przecięcia się obiektów oraz śledzenie aktywnego obiektu.

Finalny produkt powinien składać się z aplikacji w przeglądarce, która wyświetli mapę, naniesie na nią dane wejściowe oraz pozwoli użytkownikowi na edycję prędkości zmiany aktywnego obiektu.

## Technologie

* React (z wykorzystaniem TypeScript)
* Sass
* OpenLayers
* .NET 8
* Entity Framework Core
* PostgreSQL

## Wymagania

### Frontend

* **Stworzenie mapy:** Użyj biblioteki OpenLayers do stworzenia mapy.
* **UI:** Interfejs aplikacji powinien zawierać przycisk Start/Stop, textbox z możliwością wpisania liczby całkowitej (opóźnienie zmiany pozycji) oraz opcję umożliwiającą import GeoJSON-a.
* **Wczytanie toru na mapę:** Załaduj na mapę dane poligonowe z pliku GeoJSON (`raceTrack.json`), który reprezentuje przebieg nawierzchni toru wyścigowego.
* **Wczytanie pliku GeoJSON:** Użytkownik powinien mieć możliwość wczytania pliku GeoJSON z danymi punktowymi do aplikacji. Możliwe powinno być wczytanie pliku przez przeciągnięcie i upuszczenie (Drag & Drop) albo przez wybranie pliku z listy.
* **Animacja:** Po wpisaniu wartości opóźnienia (w milisekundach) i kliknięciu przycisku "Start", na mapie powinna się pojawić ikonka (`fastRaceCar.svg`), która będzie przechodzić z punktu na punkt z określonym opóźnieniem. Ikona powinna być skierowana w kierunku jazdy, a animacja powinna się zatrzymać po kliknięciu przycisku "Stop".
* **Detekcja pozycji:** Jeśli animowany punkt znajdzie się poza obrębem toru lub w jego środku, aplikacja powinna wyświetlić powiadomienie i zapisać je do bazy danych.

### Backend

* **Model danych:** Stwórz model danych, który będzie przechowywać informacje o pozycji, które wyszły poza obręb stadionu lub znalazły się w jego środku, wraz z czasem wyjścia (UTC+2).
* **API Endpoint:** Stwórz endpoint, który pozwoli na zapisanie tych danych do bazy danych PostgreSQL.
* **Integracja z Entity Framework Core:** Skonfiguruj Entity Framework Core, aby zarządzać zapisem danych do bazy PostgreSQL.

### Dodatkowe

* **Stylowanie:** Użyj Sass do stylowania komponentów.
* **Responsywność:** Aplikacja powinna być responsywna.
* **Błędy:** Obsłuż błędy, które mogą wystąpić podczas wczytywania plików lub komunikacji z API.

## Przydatne linki

* [Obliczanie azymutu (AGH)](https://brasil.cel.agh.edu.pl/~11sjjurek/azymut.html)
* [Dokumentacja OpenLayers](https://openlayers.org/en/latest/apidoc/)