# Plan Realizacji Zadania Rekrutacyjnego - Web Dev (GIS)

## Faza 1: Przygotowanie Środowiska (Environment Setup)
Zanim zaczniesz kodować, upewnij się, że fundamenty są gotowe.

- [x] Baza Danych: Uruchom PostgreSQL (zalecany Docker).
    - `docker run --name race-db -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_USER=admin -p 5432:5432 -d postgres`
    - Stwórz pustą bazę danych: `RaceTrackDb`.
- [x] Backend Init: Solucja z architekturą Clean Architecture.
    - Projekty: `RaceTrack.Api`, `RaceTrack.Application`, `RaceTrack.Domain`, `RaceTrack.Infrastructure`
- [x] Frontend Init: Projekt React + TypeScript (Vite) w `RaceTrack.Api/RaceTrack.Client/`.
- [x] Zależności Frontend: Zainstalowane biblioteki (`ol`, `sass`, `@types/ol`).

---

## Faza 2: Backend (.NET 8 + EF Core + Clean Architecture)
Budowa API do logowania zdarzeń.

- [x] Konfiguracja Projektu:
    - `RaceTrack.Infrastructure`: `Npgsql.EntityFrameworkCore.PostgreSQL`
    - `RaceTrack.Api`: `Microsoft.EntityFrameworkCore.Design`, `Scalar.AspNetCore`, `Swashbuckle.AspNetCore.SwaggerGen`
- [x] Model Danych (`RaceTrack.Domain/Entities/RaceEventLog.cs`):
    - Pola: `Id` (int), `PositionX` (double), `PositionY` (double), `Timestamp` (DateTime).
- [x] Interfejs Repozytorium (`RaceTrack.Domain/IRepositories/IRaceEventLogRepository.cs`):
    - Metody: `Create`, `SaveChanges`.
- [x] DbContext (`RaceTrack.Infrastructure/Persistence/RaceTrackDbContext.cs`):
    - Klasa `RaceTrackDbContext` z `DbSet<RaceEventLog>`.
- [x] Repozytorium (`RaceTrack.Infrastructure/Repositories/RaceEventRepository.cs`):
    - Implementacja z konwersją czasu do UTC+2 (Central European Standard Time).
- [x] Connection String (`appsettings.json`):
    - `Host=localhost;Port=5432;Database=RaceTrackDb;Username=admin;Password=secretpassword`
- [x] Rejestracja DbContext (`RaceTrack.Infrastructure/Extensions/ServiceCollectionExtensions.cs`).
- [x] Rejestracja Repozytorium w DI (`ServiceCollectionExtensions.cs`):
    - Dodaj `services.AddScoped<IRaceEventLogRepository, RaceEventRepository>()`.
- [x] Migracje: Wykonane (`20251121144126_Init`).
- [x] API Endpoint (`RaceTrack.Api/Controllers/RaceTrackController.cs`):
    - Dodaj metodę `POST` przyjmującą dane i zapisującą je w bazie przez repozytorium.
- [x] CORS (`RaceTrack.Api/Extensions/WebApplicationBuilderExtensions.cs`):
    - Skonfigurowano dla `localhost:5173`.

---

## Faza 3: Frontend - Mapa i Tor (OpenLayers)
Wyświetlenie mapy i statycznych danych.

- [x] Setup Mapy:
    - Stwórz komponent `MapWrapper.tsx`.
    - Zainicjuj obiekt `new Map()` z `View` i warstwą kafelkową (np. OSM).
    - Pamiętaj o stylach CSS dla kontenera mapy (musi mieć wysokość!).
- [x] Wczytanie Toru (`raceTrack.json`):
    - Zaimportuj plik GeoJSON z torem (wielokąt).
    - Stwórz `VectorLayer` i `VectorSource`.
    - Wczytaj dane z `raceTrack.json` do źródła.

---

## Faza 4: Interfejs Użytkownika (UI) & Import Danych
Interakcja z użytkownikiem.

- [x] Layout: Stwórz prosty layout (Sidebar na kontrolki + Główny obszar na mapę).
- [x] Inputy:
    - Pole tekstowe dla opóźnienia (ms).
    - Przyciski "Start" i "Stop".
- [x] Import Trasy (Drag & Drop / File Input):
    - Dodaj obsługę wczytywania pliku `.json` z lokalnego dysku.
    - Rozparsuj plik i wyciągnij współrzędne punktów trasy.
    - (Opcjonalnie) Wyświetl trasę na mapie jako linię pomocniczą, żeby widzieć, gdzie auto pojedzie.

---

## Faza 5: Logika Biznesowa - Animacja i Kolizje
Najtrudniejsza część - serce aplikacji.

- [x] Warstwa Auta:
    - Dodaj nową warstwę wektorową dla auta.
    - Stwórz `Feature` (punkt) ze stylem `Icon` (`fastRaceCar.svg`).
- [x] Mechanizm Animacji:
    - Użyj `useRef` do przechowywania aktualnego indeksu punktu trasy.
    - Użyj `useEffect` z `setInterval` (lub rekurencyjnego `setTimeout`), który uruchamia się po kliknięciu "Start".
    - W każdej klatce aktualizuj współrzędne `Feature` auta.
- [x] Obliczanie Rotacji:
    - Oblicz kąt między obecnym a następnym punktem (`Math.atan2`).
    - Zaktualizuj styl ikony, ustawiając `rotation`.
- [x] Detekcja Kolizji (W każdym kroku):
    - Pobierz geometrię toru (Polygon).
    - Sprawdź `polygon.intersectsCoordinate(carPosition)`.
    - Jeśli `false` (poza torem) lub `true` (wewnątrz "dziury" toru - o ile tor ją ma) -> Trigger API.

---

## Faza 6: Integracja i Obsługa Błędów
Łączenie klocków w całość.

- [x] API Call:
    - W momencie wykrycia błędu, wyślij `fetch` POST do swojego API.
    - Wyświetl powiadomienie (np. prosty `alert` lub customowy `Toast`) na ekranie.
- [x] Walidacja:
    - Zablokuj przycisk "Start", jeśli nie wczytano pliku trasy.
    - Obsłuż błąd, jeśli użytkownik wgra zły plik JSON.

---

## Faza 7: Stylowanie i Szlifowanie (Polish)
Dbałość o detale.

- [x] Sass:
    - Przenieś style CSS do plików `.scss`.
    - Użyj zmiennych dla kolorów i fontów.
- [x] Responsywność:
    - Sprawdź, czy panel boczny nie zasłania mapy na telefonie.
- [x] Clean Code:
    - Usuń `console.log`.

---
