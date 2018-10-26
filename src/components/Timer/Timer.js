import React from 'react'

import cls from './Timer.module.css'
import date from '../../helpers/formatDate'

const Timer = (props) => {
  const { duration, elapsedTime } = props
  const timer = date.printFromSeconds(duration - elapsedTime)
  document.title = `${timer} | React Pomodoro`
  
  return <span className={cls.timer}>
           {timer}
         </span>
}

export default Timer
