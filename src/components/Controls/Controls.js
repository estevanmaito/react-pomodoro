import React, { PureComponent } from 'react'

import play from '../../assets/img/play.png'
import refresh from '../../assets/img/refresh.png'
import clock from '../../assets/img/clock.png'
import cls from './Controls.module.css'

class Controls extends PureComponent {
  render() {
    return (
      <div>
        <button
          className={cls.btn}
          onClick={this.props.handleTimer}>
          <img src={this.props.hasStarted ? refresh : play} alt="Play"/></button>
        <button
          className={cls.btn}
          onClick={this.props.showHistory}>
          <img src={clock} alt="History"/></button>
      </div>
    )
  }
}

export default Controls
