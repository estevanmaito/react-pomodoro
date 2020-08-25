import React from 'react'
import { ReactComponent as WorkIcon } from '../../assets/img/desktop.svg'
import { ReactComponent as CoffeeIcon } from '../../assets/img/coffee.svg'

interface Props {
  type: string
}

function TimerTypeIcon({type}: Props) {
  return (
    <div style={{ width: '50px' }}>{type !== 'break' ? <WorkIcon /> : <CoffeeIcon />}</div>
  )
}

export default TimerTypeIcon
