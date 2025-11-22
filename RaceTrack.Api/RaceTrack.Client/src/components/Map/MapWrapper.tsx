import {type JSX, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import 'ol/ol.css';
import {createTrackLayer, createTrackSource} from "./layers.ts";
import {createMap} from "./map.ts";

const MapWrapper = () : JSX.Element => {
  // ref do diva mapy
  const mapRef = useRef<HTMLDivElement>(null);

  // ref do instancji mapy (będzie potrzebny aby mieć dostęp z zewnątrz komponentu)
  const mapInstanceRef = useRef<Map | null>(null);  

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const trackSource = createTrackSource();
    const trackLayer = createTrackLayer(trackSource);
    const map = createMap(mapRef, trackLayer);
    
    // Po załadowaniu toru, wycentruj mapę na torze
    trackSource.once('change', () => {
      if (trackSource.getState() === 'ready') {
        const extent = trackSource.getExtent();
        map.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          maxZoom: 17,
        });
      }
    });

    // przypisanie instancji mapy do ref'a'
    mapInstanceRef.current = map;

    // czyszczenie instancji mapy po unmountu komponentu (ngOnDestroy)
    return () => {
      map.setTarget(undefined);
      mapInstanceRef.current = null;
    };
  }, [] /** nie obserwujemy niczego, ponieważ nasza mapa jest inicjalizowana tylko raz (ngOnInit) */);

  return <div ref={mapRef} className="map-container" />;
};

export default MapWrapper;