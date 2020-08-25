import React from 'react'

import cls from './Timer.module.css'
import date from '../../helpers/formatDate'

interface Props {
  duration: number
  elapsedTime: number
}

function Timer({duration, elapsedTime}: Props) {
  const timer = date.printFromSeconds(duration - elapsedTime)
  document.title = `${timer} | React Pomodoro`

  return <span className={cls.timer}>{timer}</span>
}

export default Timer
