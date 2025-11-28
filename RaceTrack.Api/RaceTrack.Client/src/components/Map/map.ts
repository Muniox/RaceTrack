import type {RefObject} from "react";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import View from "ol/View";

/**
 * Przyklad pobierania z url i nadania formatu
 * https://openlayers.org/en/latest/examples/center.html
 * */

const view = new View({
    center: [0, 0],
    zoom: 2,
})

// Inicjalizacja mapy, którą przypiszemy do instancji mapy
export const createMap = (mapRef: RefObject<HTMLDivElement | null>, trackLayer: VectorLayer, vehicleLayer: VectorLayer) => new Map({
    target: mapRef.current ?? undefined,
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        trackLayer, // nasz tor
        vehicleLayer, // pojazd
    ],
    view: view,
});