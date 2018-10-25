import React, { PureComponent } from 'react'

import { ReactComponent as PlayIcon } from '../../assets/img/play.svg'
import { ReactComponent as RefreshIcon } from '../../assets/img/refresh.svg'
import { ReactComponent as ClockIcon } from '../../assets/img/list.svg'
import cls from './Controls.module.css'

class Controls extends PureComponent {
  render() {
    return (
      <div>
        <button
          className={cls.btn}
          onClick={this.props.handleTimer}>
          {
            this.props.hasStarted ?
            <RefreshIcon /> :
            <PlayIcon />
          }
        </button>
        <button
          className={cls.btn}
          onClick={this.props.showHistory}>
          <ClockIcon /></button>
      </div>
    )
  }
}

export default Controls
