import type { Coordinate } from "ol/coordinate";

export interface RoutePoint {
  coordinate: Coordinate;
  distance: number;
}
