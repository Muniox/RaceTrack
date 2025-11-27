import type { JSX, ChangeEvent } from "react";

import "./ControlPanel.scss";

interface ControlPanelProps {
  delay: number;
  onDelayChange: (value: number) => void;
  isRunning: boolean;
  onStartStop: () => void;
  disabled?: boolean;
}

const ControlPanel = ({
  delay,
  onDelayChange,
  isRunning,
  onStartStop,
  disabled = false,
}: ControlPanelProps): JSX.Element => {
  const handleDelayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      onDelayChange(value);
    }
  };

  return (
    <div className="control-panel">
      <h2 className="control-panel__title">Sterowanie</h2>

      <div className="control-panel__control-group">
        <label className="control-panel__label" htmlFor="delay">
          Opóźnienie (ms):
        </label>
        <input
          type="number"
          id="delay"
          className="control-panel__input"
          value={delay}
          onChange={handleDelayChange}
          min={0}
          step={100}
          disabled={isRunning}
        />
      </div>

      <button
        className={`control-panel__button control-panel__button--${isRunning ? "stop" : "start"}`}
        onClick={onStartStop}
        disabled={disabled}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default ControlPanel;
