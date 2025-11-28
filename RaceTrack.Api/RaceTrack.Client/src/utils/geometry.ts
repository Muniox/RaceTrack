import type { Coordinate } from "ol/coordinate";
import { fromLonLat } from "ol/proj";
import type { RoutePoint } from "../types";

/**
 * Oblicza rotację (w radianach) między dwoma punktami.
 * OpenLayers używa kierunku zegarowego, dlatego wynik jest negowany.
 */
export const calculateRotation = (from: Coordinate, to: Coordinate): number => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  // Minus, bo OpenLayers używa kierunku zgodnego z ruchem wskazówek zegara
  return -Math.atan2(dy, dx);
};

/**
 * Parsuje GeoJSON z trasą i zwraca tablicę punktów w projekcji mapy (EPSG:3857).
 */
export const parseRouteGeoJSON = async (path: string): Promise<RoutePoint[]> => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Nie udało się załadować trasy: ${path}`);
  }
  
  const geoJson = await response.json();
  
  if (!geoJson.features || !Array.isArray(geoJson.features)) {
    throw new Error("Nieprawidłowy format GeoJSON");
  }

  return geoJson.features
    .filter((feature: { geometry?: { type?: string } }) => feature.geometry?.type === "Point")
    .map((feature: { geometry: { coordinates: number[] }; properties?: { distance?: string } }) => ({
      coordinate: fromLonLat(feature.geometry.coordinates),
      distance: parseFloat(feature.properties?.distance || "0"),
    }));
};
