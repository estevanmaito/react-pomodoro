import React from 'react'
import { ReactComponent as WorkIcon } from '../../assets/img/desktop.svg'
import { ReactComponent as CoffeeIcon } from '../../assets/img/coffee.svg'

const TimerTypeIcon = (props) => {
  return (
    <div style={{ width: '50px' }}>
      {
        props.type !== 'break' ?
          <WorkIcon /> :
          <CoffeeIcon  />
      }
    </div>
  )
}

export default TimerTypeIcon
