import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Polygon } from "ol/geom";
import type { Coordinate } from "ol/coordinate";
import { toLonLat } from "ol/proj";
import { toast } from "react-toastify";

import { AVAILABLE_ROUTES } from "../components/Sidebar/constants";
import {
  updateVehiclePosition,
  updateVehicleRotation,
  setVehicleVisible,
} from "../components/Map/layers";
import { calculateRotation, parseRouteGeoJSON, logCollisionEvent } from "../utils";
import type { RoutePoint, AnimationContextType } from "../types";
import { AnimationContext } from "./AnimationContextInstance";

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  // Stan animacji
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(500);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);

  // Refy
  const intervalRef = useRef<number | null>(null);
  const trackPolygonRef = useRef<Polygon | null>(null);
  const currentIndexRef = useRef(0);
  const isRunningRef = useRef(false);
  const lastCollisionIndexRef = useRef(-10); // Aby nie spamować powiadomieniami

  // Aktualizuj ref gdy zmienia się stan
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  // Ustaw polygon toru
  const setTrackPolygon = useCallback((polygon: Polygon | null) => {
    trackPolygonRef.current = polygon;
  }, []);

  // Sprawdź kolizję
  const checkCollision = useCallback(
    async (coordinate: Coordinate, index: number) => {
      const polygon = trackPolygonRef.current;
      if (!polygon) return;

      // Sprawdź czy punkt jest wewnątrz toru
      const isInsideTrack = polygon.intersectsCoordinate(coordinate);
      
      // Jeśli punkt jest poza torem, zgłoś kolizję
      if (!isInsideTrack) {
        // Nie spamuj powiadomieniami - min 5 punktów odstępu
        if (index - lastCollisionIndexRef.current < 5) return;
        lastCollisionIndexRef.current = index;

        const [lon, lat] = toLonLat(coordinate);
        
        toast.warning(
          `Pojazd wyjechał poza tor! Pozycja: ${lat.toFixed(6)}, ${lon.toFixed(6)}`
        );

        // Wyślij do API
        try {
          await logCollisionEvent({
            positionX: lon,
            positionY: lat,
          });
        } catch {
          toast.error("Błąd podczas zapisywania zdarzenia w bazie danych");
        }
      }
    },
    []
  );

  // Załaduj trasę gdy zmieni się wybrana trasa
  useEffect(() => {
    if (!selectedRoute) {
      return;
    }

    const route = AVAILABLE_ROUTES.find((r) => r.id === selectedRoute);
    if (!route) return;

    let isMounted = true;

    parseRouteGeoJSON(route.path)
      .then((points) => {
        if (isMounted) {
          setRoutePoints(points);
          setCurrentIndex(0);
          currentIndexRef.current = 0;
          lastCollisionIndexRef.current = -10;
        }
      })
      .catch((error) => {
        console.error("Błąd ładowania trasy:", error);
        if (isMounted) {
          toast.error("Nie udało się załadować trasy");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedRoute]);

  // Resetuj punkty gdy trasa zostanie odznaczona
  const handleSetSelectedRoute = useCallback((routeId: string) => {
    if (!routeId) {
      setRoutePoints([]);
    }
    setSelectedRoute(routeId);
  }, []);

  // Funkcja zatrzymania animacji
  const stopAnimation = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Krok animacji
  const animationStep = useCallback(() => {
    if (!isRunningRef.current || routePoints.length === 0) return;

    const index = currentIndexRef.current;
    const point = routePoints[index];

    // Aktualizuj pozycję
    updateVehiclePosition(point.coordinate);

    // Oblicz i ustaw rotację (jeśli jest następny punkt)
    if (index < routePoints.length - 1) {
      const nextPoint = routePoints[index + 1];
      const rotation = calculateRotation(point.coordinate, nextPoint.coordinate);
      updateVehicleRotation(rotation);
    }

    // Sprawdź kolizję
    checkCollision(point.coordinate, index);

    // Sprawdź czy to ostatni punkt
    if (index >= routePoints.length - 1) {
      toast.success("Przejazd zakończony!");
      stopAnimation();
      return;
    }

    // Przejdź do następnego punktu
    const nextIndex = index + 1;
    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
  }, [routePoints, checkCollision, stopAnimation]);

  // Start animacji
  const start = useCallback(() => {
    if (routePoints.length === 0) {
      toast.info("Wybierz trasę przed startem");
      return;
    }

    // Resetuj indeks na początek trasy
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    lastCollisionIndexRef.current = -10;

    setIsRunning(true);
    isRunningRef.current = true;
    setVehicleVisible(true);

    // Ustaw początkową pozycję i rotację
    if (routePoints.length > 1) {
      const firstPoint = routePoints[0].coordinate;
      const secondPoint = routePoints[1].coordinate;
      
      updateVehiclePosition(firstPoint);
      
      // Oblicz początkową rotację w kierunku drugiego punktu
      const initialRotation = calculateRotation(firstPoint, secondPoint);
      updateVehicleRotation(initialRotation);
    } else if (routePoints.length > 0) {
      updateVehiclePosition(routePoints[0].coordinate);
    }

    // Uruchom interval
    intervalRef.current = window.setInterval(animationStep, delay);
  }, [routePoints, delay, animationStep]);

  // Cleanup przy unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const value: AnimationContextType = {
    isRunning,
    delay,
    selectedRoute,
    currentIndex,
    totalPoints: routePoints.length,
    setDelay,
    setSelectedRoute: handleSetSelectedRoute,
    start,
    stop: stopAnimation,
    setTrackPolygon,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
