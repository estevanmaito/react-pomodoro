import React from "react";

import { ReactComponent as PlayIcon } from "../../assets/img/play.svg";
import { ReactComponent as StopIcon } from "../../assets/img/stop.svg";
import { ReactComponent as RefreshIcon } from "../../assets/img/refresh.svg";
import { ReactComponent as HistoryIcon } from "../../assets/img/list.svg";
import cls from "./Controls.module.css";

const Controls = props => {
  const {
    handleStartStopTimer,
    handleResetTimer,
    hasStarted,
    showHistory
  } = props;

  return (
    <div>
      <button
        className={cls.btn}
        onClick={handleStartStopTimer}
        title="Play/Stop"
      >
        {hasStarted ? <StopIcon /> : <PlayIcon />}
      </button>
      <button
        className={cls.btn}
        onClick={handleResetTimer}
        title="Reset timer"
      >
        <RefreshIcon />
      </button>
      <button className={cls.btn} onClick={showHistory} title="History">
        <HistoryIcon />
      </button>
    </div>
  );
};

export default React.memo(Controls);
