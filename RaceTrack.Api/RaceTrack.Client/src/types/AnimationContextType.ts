import type { Polygon } from "ol/geom";

export interface AnimationContextType {
  // Stan
  isRunning: boolean;
  delay: number;
  selectedRoute: string;
  currentIndex: number;
  totalPoints: number;

  // Akcje
  setDelay: (delay: number) => void;
  setSelectedRoute: (routeId: string) => void;
  start: () => void;
  stop: () => void;
  setTrackPolygon: (polygon: Polygon | null) => void;
}
