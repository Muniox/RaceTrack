import type { JSX } from "react";

import "./StatusIndicator.scss";

interface StatusIndicatorProps {
  isRunning: boolean;
}

const StatusIndicator = ({ isRunning }: StatusIndicatorProps): JSX.Element => {
  return (
    <div className="status-indicator">
      <h2 className="status-indicator__title">Status</h2>
      <div className={`status-indicator__status ${isRunning ? "status-indicator__status--running" : ""}`}>
        <span className="status-indicator__dot"></span>
        <span className="status-indicator__text">
          {isRunning ? "Animacja w toku" : "Zatrzymano"}
        </span>
      </div>
    </div>
  );
};

export default StatusIndicator;