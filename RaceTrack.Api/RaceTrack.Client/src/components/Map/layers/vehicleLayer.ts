import { Feature } from "ol";
import type { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector"
import { Icon, Style } from "ol/style";

import carIcon from "../../../assets/fastRaceCar.svg";

// 1. Source i Feature pojazdu
const vehicleSource = new VectorSource();
const vehicleFeature = new Feature();
let vehicleLayer: VectorLayer<VectorSource> | null = null;
let isFeatureAdded = false;

// 2. Styl z ikoną
export const createVehicleStyle = (rotation: number): Style => {
    return new Style({
        image: new Icon({
            src: carIcon,
            rotation: rotation,
            scale: 0.2,
        }),
    });
};

// 3. Tworzenie warstwy (singleton pattern)
export const createVehicleLayer = (): VectorLayer<VectorSource> => {
    if (vehicleLayer) {
        return vehicleLayer;
    }

    vehicleFeature.setStyle(createVehicleStyle(0));
    
    if (!isFeatureAdded) {
        vehicleSource.addFeature(vehicleFeature);
        isFeatureAdded = true;
    }

    vehicleLayer = new VectorLayer({
        source: vehicleSource,
        zIndex: 100,
    });

    return vehicleLayer;
};

// 4. Aktualizacja pozycji
export const updateVehiclePosition = (coordinate: Coordinate): void => {
    vehicleFeature.setGeometry(new Point(coordinate));
};

// 5. Aktualizacja rotacji (kierunek jazdy)
export const updateVehicleRotation = (rotation: number): void => {
    vehicleFeature.setStyle(createVehicleStyle(rotation));
};

// 6. Pokaż/ukryj pojazd
export const setVehicleVisible = (visible: boolean): void => {
    if (visible) {
        vehicleFeature.setStyle(createVehicleStyle(0));
    } else {
        vehicleFeature.setStyle(undefined);
    }
};

// 7. Reset warstwy (dla cleanup)
export const resetVehicleLayer = (): void => {
    vehicleLayer = null;
};