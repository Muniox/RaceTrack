import { useState, type JSX, type ChangeEvent } from "react";

import "./Sidebar.scss";
import { AVAILABLE_ROUTES } from "./constants";
import StatusIndicator from "./StatusIndicator/StatusIndicator";

const Sidebar = (): JSX.Element => {
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState<number>(500);
  const [selectedRoute, setSelectedRoute] = useState<string>("");

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleDelayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setDelay(value);
    }
  };

  const handleRouteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    setSelectedRoute(routeId);
    
    if (routeId) {
      const route = AVAILABLE_ROUTES.find((r) => r.id === routeId);
      if (route) {
        // TODO: Załaduj trasę z pliku
        console.log("Wybrano trasę:", route.name, route.path);
      }
    }
  };

  const selectedRouteName = AVAILABLE_ROUTES.find((r) => r.id === selectedRoute)?.name;

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">Race Track</h1>
        <p className="sidebar__subtitle">Kontroler animacji</p>
      </div>

      <div className="sidebar__section">
        <h2 className="sidebar__section-title">Wybór trasy</h2>
        
        <div className="sidebar__control-group">
          <label className="sidebar__label" htmlFor="route">
            Trasa pojazdu:
          </label>
          <select
            id="route"
            className="sidebar__select"
            value={selectedRoute}
            onChange={handleRouteChange}
            disabled={isRunning}
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
          <div className="sidebar__file-info">
            <span className="sidebar__file-icon">✓</span>
            <span className="sidebar__file-name">Wybrano: {selectedRouteName}</span>
          </div>
        )}
      </div>

      <div className="sidebar__section">
        <h2 className="sidebar__section-title">Sterowanie</h2>
        
        <div className="sidebar__control-group">
          <label className="sidebar__label" htmlFor="delay">
            Opóźnienie (ms):
          </label>
          <input
            type="number"
            id="delay"
            className="sidebar__input"
            value={delay}
            onChange={handleDelayChange}
            min={0}
            step={100}
            disabled={isRunning}
          />
        </div>

        <button
          className={`sidebar__button sidebar__button--${isRunning ? "stop" : "start"}`}
          onClick={handleStartStop}
          disabled={!selectedRoute}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>

        <StatusIndicator isRunning={isRunning} />
    </aside>
  );
};

export default Sidebar;