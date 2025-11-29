# Plan Realizacji Zadania Rekrutacyjnego - Web Dev (GIS)

## Faza 1: Przygotowanie Środowiska
- [x] Uruchomienie bazy danych (PostgreSQL)
- [x] Inicjalizacja projektu Backend (.NET Web API)
- [x] Inicjalizacja projektu Frontend (React + TypeScript)
- [x] Instalacja wymaganych bibliotek (OpenLayers, SASS)

## Faza 2: Backend i Baza Danych
- [x] Konfiguracja Entity Framework i modelu danych
- [x] Wykonanie migracji bazy danych
- [x] Stworzenie endpointu API do zapisywania logów
- [x] Konfiguracja polityki CORS

## Faza 3: Konfiguracja Mapy (Frontend)
- [x] Implementacja komponentu mapy OpenLayers
- [x] Ustawienie widoku startowego i warstwy kafelkowej
- [x] Wczytanie i wyświetlenie statycznego toru (GeoJSON)

## Faza 4: Interfejs Użytkownika (UI)
- [x] Stworzenie układu strony (mapa + panel boczny)
- [x] Dodanie kontrolek sterujących (Start, Stop, Input opóźnienia)
- [x] Implementacja mechanizmu importu pliku z trasą

## Faza 5: Logika Animacji i Kolizji
- [x] Dodanie warstwy wektorowej dla pojazdu
- [x] Implementacja pętli animacji ruchu po trasie
- [x] Obliczanie rotacji pojazdu względem trasy
- [x] Algorytm wykrywania wyjazdu poza tor

## Faza 6: Integracja i Obsługa Błędów
- [x] Wywołanie API w momencie wykrycia kolizji
- [x] Wyświetlanie powiadomień o zdarzeniach na ekranie
- [x] Walidacja wczytywanych plików i blokada przycisków

## Faza 7: Stylowanie i Finalizacja
- [x] Stylowanie komponentów przy użyciu SASS
- [x] Poprawa responsywności interfejsu
- [x] Refaktoryzacja kodu i usunięcie logów deweloperskich

## Zasoby Startowe
- [x] Plik toru (`raceTrack.json`)
- [x] Grafika pojazdu (`fastRaceCar.svg`)
- [x] Przykładowy plik trasy do testów (GeoJSON) (`lap1.json`, `lap2.json`)