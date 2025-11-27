import { useState, type JSX } from "react";

import "./Sidebar.scss";
import ControlPanel from "./ControlPanel/ControlPanel";
import RouteSelector from "./RouteSelector/RouteSelector";
import StatusIndicator from "./StatusIndicator/StatusIndicator";

const Sidebar = (): JSX.Element => {
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState<number>(500);
  const [selectedRoute, setSelectedRoute] = useState<string>("");

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleDelayChange = (value: number) => {
    setDelay(value);
  };

  const handleRouteChange = (routeId: string) => {
    setSelectedRoute(routeId);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">Race Track</h1>
        <p className="sidebar__subtitle">Kontroler animacji</p>
      </div>

      <RouteSelector
        selectedRoute={selectedRoute}
        onRouteChange={handleRouteChange}
        disabled={isRunning}
      />

      <ControlPanel
        delay={delay}
        onDelayChange={handleDelayChange}
        isRunning={isRunning}
        onStartStop={handleStartStop}
        disabled={!selectedRoute}
      />

      <StatusIndicator isRunning={isRunning} />
    </aside>
  );
};

export default Sidebar;