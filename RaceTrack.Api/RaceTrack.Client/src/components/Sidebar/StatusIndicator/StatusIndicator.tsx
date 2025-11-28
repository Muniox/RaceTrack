import type { JSX } from "react";

import "./StatusIndicator.scss";

interface StatusIndicatorProps {
  isRunning: boolean;
  currentIndex?: number;
  totalPoints?: number;
}

const StatusIndicator = ({ 
  isRunning, 
  currentIndex = 0, 
  totalPoints = 0 
}: StatusIndicatorProps): JSX.Element => {
  const progress = totalPoints > 0 ? ((currentIndex / totalPoints) * 100).toFixed(1) : 0;

  return (
    <div className="status-indicator">
      <h2 className="status-indicator__title">Status</h2>
      <div className={`status-indicator__status ${isRunning ? "status-indicator__status--running" : ""}`}>
        <span className="status-indicator__dot"></span>
        <span className="status-indicator__text">
          {isRunning ? "Animacja w toku" : "Zatrzymano"}
        </span>
      </div>
      
      {totalPoints > 0 && (
        <div className="status-indicator__progress">
          <div className="status-indicator__progress-bar">
            <div 
              className="status-indicator__progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="status-indicator__progress-text">
            {currentIndex} / {totalPoints} ({progress}%)
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;