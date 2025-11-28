import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";

/**
 * Przyklad pobierania z url i nadania formatu
 * https://openlayers.org/en/latest/examples/center.html
 * */

// jak w przykładzie pobieram z url i nadaje format
export const createTrackSource = () => new VectorSource({
    url: '/data/raceTrack.json',
    format: new GeoJSON(),
});

// https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html
export const createTrackLayer = (trackSource: VectorSource) =>  new VectorLayer({
    // source jako tor
    source: trackSource,
    // styl toru (wypełnienie i obrys)
    style: new Style({
        fill: new Fill({
            color: 'rgba(45, 45, 45, 0.7)'  // ciemny asfalt
        }),
        stroke: new Stroke({
            color: '#ff4444',  // czerwona krawędź toru
            width: 3
        })
    }),
});