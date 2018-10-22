import React from 'react'

import pomodoro from '../../assets/img/computer.png'
import interval from '../../assets/img/cafe.png'

const Icon = (props) => {
  return (
    <div style={{width: '40px'}}>
      <img 
        style={{width: '100%'}}
        src={props.icon === 'break' ? interval : pomodoro} 
        alt=""/>
    </div>
  )
}

export default Icon
