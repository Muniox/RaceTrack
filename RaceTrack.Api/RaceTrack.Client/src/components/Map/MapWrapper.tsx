import {type JSX, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import 'ol/ol.css';
import type { Polygon } from 'ol/geom';

import {
  createTrackLayer, 
  createTrackSource,
  createVehicleLayer,
  resetVehicleLayer
} from "./layers";
import {createMap} from "./map.ts";
import { useAnimation } from '../../context';
import './MapWrapper.scss';

const MapWrapper = () : JSX.Element => {
  // ref do diva mapy
  const mapRef = useRef<HTMLDivElement>(null);

  // ref do instancji mapy (będzie potrzebny aby mieć dostęp z zewnątrz komponentu)
  const mapInstanceRef = useRef<Map | null>(null);
  
  const { setTrackPolygon } = useAnimation();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const trackSource = createTrackSource();
    const trackLayer = createTrackLayer(trackSource);
    const vehicleLayer = createVehicleLayer();
    const map = createMap(mapRef, trackLayer, vehicleLayer);
    
    // Po załadowaniu toru, wycentruj mapę na torze i przekaż polygon do contextu
    trackSource.once('change', () => {
      if (trackSource.getState() === 'ready') {
        const extent = trackSource.getExtent();
        map.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          maxZoom: 17,
        });

        // Pobierz geometrię toru (polygon) dla detekcji kolizji
        const features = trackSource.getFeatures();
        if (features.length > 0) {
          const geometry = features[0].getGeometry();
          if (geometry && geometry.getType() === 'Polygon') {
            setTrackPolygon(geometry as Polygon);
          }
        }
      }
    });

    // przypisanie instancji mapy do ref'a'
    mapInstanceRef.current = map;

    // czyszczenie instancji mapy po unmountu komponentu (ngOnDestroy)
    return () => {
      map.setTarget(undefined);
      mapInstanceRef.current = null;
      setTrackPolygon(null);
      resetVehicleLayer();
    };
  }, [setTrackPolygon] /** nie obserwujemy niczego, ponieważ nasza mapa jest inicjalizowana tylko raz (ngOnInit) */);

  return <div ref={mapRef} className="map-container" />;
};

export default MapWrapper;