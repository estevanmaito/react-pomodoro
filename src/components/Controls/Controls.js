import React, { PureComponent } from 'react'

import { ReactComponent as PlayIcon } from '../../assets/img/play.svg'
import { ReactComponent as StopIcon } from '../../assets/img/stop.svg'
import { ReactComponent as RefreshIcon } from '../../assets/img/refresh.svg'
import { ReactComponent as HistoryIcon } from '../../assets/img/list.svg'
import cls from './Controls.module.css'

class Controls extends PureComponent {
  render() {
    const { handleStartStopTimer,
      handleResetTimer,
      hasStarted,
      showHistory } = this.props
      
    return (
      <div>
        <button
          className={cls.btn}
          onClick={handleStartStopTimer}
          title="Play/Stop">
          {
            hasStarted ?
            <StopIcon /> :
            <PlayIcon />
          }
        </button>
        <button
         className={cls.btn}
         onClick={handleResetTimer}
         title="Reset timer"
         disabled={!hasStarted}>
          <RefreshIcon />
        </button>
        <button
          className={cls.btn}
          onClick={showHistory}
          title="History">
          <HistoryIcon /></button>
      </div>
    )
  }
}

export default Controls
