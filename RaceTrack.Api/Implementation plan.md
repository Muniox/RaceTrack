# Plan Realizacji Zadania Rekrutacyjnego - Web Dev (GIS)

## Faza 1: Przygotowanie Środowiska
- [x] Uruchomienie bazy danych (PostgreSQL)
- [x] Inicjalizacja projektu Backend (.NET Web API)
- [x] Inicjalizacja projektu Frontend (React + TypeScript)
- [x] Instalacja wymaganych bibliotek (OpenLayers, SASS)

## Faza 2: Backend i Baza Danych
- [x] Konfiguracja Entity Framework i modelu danych
- [x] Wykonanie migracji bazy danych
- [ ] Stworzenie endpointu API do zapisywania logów
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
- [ ] Dodanie warstwy wektorowej dla pojazdu
- [ ] Implementacja pętli animacji ruchu po trasie
- [ ] Obliczanie rotacji pojazdu względem trasy
- [ ] Algorytm wykrywania wyjazdu poza tor

## Faza 6: Integracja i Obsługa Błędów
- [ ] Wywołanie API w momencie wykrycia kolizji
- [ ] Wyświetlanie powiadomień o zdarzeniach na ekranie
- [ ] Walidacja wczytywanych plików i blokada przycisków

## Faza 7: Stylowanie i Finalizacja
- [x] Stylowanie komponentów przy użyciu SASS
- [x] Poprawa responsywności interfejsu
- [ ] Refaktoryzacja kodu i usunięcie logów deweloperskich

## Zasoby Startowe
- [x] Plik toru (`raceTrack.json`)
- [x] Grafika pojazdu (`fastRaceCar.svg`)
- [x] Przykładowy plik trasy do testów (GeoJSON) (`lap1.json`, `lap2.json`)