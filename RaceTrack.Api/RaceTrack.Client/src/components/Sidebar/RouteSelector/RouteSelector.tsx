import type { JSX, ChangeEvent } from "react";

import "./RouteSelector.scss";
import { AVAILABLE_ROUTES } from "../constants";

interface RouteSelectorProps {
  selectedRoute: string;
  onRouteChange: (routeId: string) => void;
  disabled?: boolean;
}

const RouteSelector = ({
  selectedRoute,
  onRouteChange,
  disabled = false,
}: RouteSelectorProps): JSX.Element => {
  const handleRouteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    onRouteChange(routeId);
  };

  const selectedRouteName = AVAILABLE_ROUTES.find(
    (r) => r.id === selectedRoute
  )?.name;

  return (
    <div className="route-selector">
      <h2 className="route-selector__title">Wybór trasy</h2>

      <div className="route-selector__control-group">
        <label className="route-selector__label" htmlFor="route">
          Trasa pojazdu:
        </label>
        <select
          id="route"
          className="route-selector__select"
          value={selectedRoute}
          onChange={handleRouteChange}
          disabled={disabled}
        >
          <option value="">-- Wybierz trasę --</option>
          {AVAILABLE_ROUTES.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRouteName && (
        <div className="route-selector__file-info">
          <span className="route-selector__file-icon">✓</span>
          <span className="route-selector__file-name">
            Wybrano: {selectedRouteName}
          </span>
        </div>
      )}
    </div>
  );
};

export default RouteSelector;
