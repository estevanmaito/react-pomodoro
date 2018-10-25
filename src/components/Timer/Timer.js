import React from 'react'

import cls from './Timer.module.css'
import date from '../../helpers/formatDate'

const Timer = (props) => {
  const { duration, elapsedTime } = props
  
  return <span className={cls.timer}>
           {date.printFromSeconds(duration - elapsedTime)}
         </span>
}

export default Timer
