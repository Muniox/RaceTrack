import type { JSX } from "react";

import "./Sidebar.scss";
import ControlPanel from "./ControlPanel";
import RouteSelector from "./RouteSelector";
import StatusIndicator from "./StatusIndicator";
import { useAnimation } from "../../context";

const Sidebar = (): JSX.Element => {
  const {
    isRunning,
    delay,
    selectedRoute,
    currentIndex,
    totalPoints,
    setDelay,
    setSelectedRoute,
    start,
    stop,
  } = useAnimation();

  const handleStartStop = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
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

      <StatusIndicator 
        isRunning={isRunning} 
        currentIndex={currentIndex}
        totalPoints={totalPoints}
      />
    </aside>
  );
};

export default Sidebar;