import type { JSX } from "react";

import "./StatusIndicator.scss";

interface StatusIndicatorProps {
  isRunning: boolean;
}

const StatusIndicator = ({ isRunning }: StatusIndicatorProps): JSX.Element => {
  return (
    <div className="sidebar__section sidebar__section--status">
      <h2 className="sidebar__section-title">Status</h2>
      <div className={`sidebar__status ${isRunning ? "sidebar__status--running" : ""}`}>
        <span className="sidebar__status-dot"></span>
        <span className="sidebar__status-text">
          {isRunning ? "Animacja w toku" : "Zatrzymano"}
        </span>
      </div>
    </div>
  );
};

export default StatusIndicator;