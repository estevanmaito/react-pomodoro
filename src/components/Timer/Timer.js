import React from 'react'

import cls from './Timer.module.css'
import date from '../../helpers/formatDate'

const Timer = (props) => {
  const { duration, elapsedTime } = props
  
  return (
    <div className={cls.timer}>
      {date.printFromSeconds(duration - elapsedTime)}
    </div>
  )
}

export default Timer
