import React, { Component } from 'react'
import Timer from '../components/Timer/Timer'
import Controls from '../components/Controls/Controls'
import History from '../components/History/History'
import Footer from '../components/Footer/Footer'
import { ReactComponent as WorkIcon } from '../assets/img/desktop.svg'
import { ReactComponent as CoffeeIcon } from '../assets/img/coffee.svg'

import DB from '../helpers/localStorage'
import formatDate from '../helpers/formatDate'

import './Pomodoro.css';
import bell from '../assets/audio/bell.mp3'

class Pomodoro extends Component {
  state = {
    pomodoros: POMODOROS,
    showHistory: false,
    hasStarted: false,
    currentPomodoro: 0,
    elapsedTime: 0,
    interval: null,
    todayPomoCount: 0,
    allTimePomoCount: 0
  }

  componentDidMount = () => {
    this.setState({
      todayPomoCount: DB.getTodaysPomodoros().length,
      allTimePomoCount: DB.getAllTimePomodoros().length
    })
  }

  handleHistoryVisibility = () => {
    this.setState(state => {return {showHistory: !state.showHistory}})
  }

  handleStartStopTimer = () => {
    if (this.state.hasStarted) {
      this.resetTimer()
    } else {
      this.tick()
      this.setState({ hasStarted: true })
    }
  }

  resetTimer = () => {
    clearInterval(this.state.interval)
    this.setState({
      pomodoros: POMODOROS,
      hasStarted: false,
      elapsedTime: 0,
      interval: null,
      currentPomodoro: 0
    })
  }

  nextPomo = () => {
    this.alert()
    // last pomodoro
    if (this.state.pomodoros.length - 1 === this.state.currentPomodoro) {
      return this.resetTimer()
    }
    this.setState(state => {
      return {
        elapsedTime: 0,
        currentPomodoro: state.currentPomodoro + 1
      }
    })
    this.savePomodoro()
  }

  // TODO: add notifications API
  alert = () => {
    const audio = new Audio(bell)
    audio.play()
  }

  tick = () => {
    const interval = setInterval(() => {
      // if timer reached 0, load next pomodoro
      if (this.state.elapsedTime === 
        this.state.pomodoros[this.state.currentPomodoro].duration) {
          return this.nextPomo()
      }
      this.setState(state => { return {elapsedTime: state.elapsedTime + 1}})
    }, 1000)

    this.setState({ interval })
    this.savePomodoro()
  }

  savePomodoro = () => {
    const currentPomodoro = this.state.pomodoros[this.state.currentPomodoro]
    const now = Date.now()
    let todayPomoCount = null
    let allTimePomoCount = null

    // Only count a finished Pomodoro when the timer
    // changes to a break
    if (currentPomodoro.type !== 'pomodoro') {
      DB.create('pomodoro', now)
      todayPomoCount = DB.getTodaysPomodoros().length
      allTimePomoCount = DB.getAllTimePomodoros().length
    }

    this.setState(state => {
      return {
        pomodoros: state.pomodoros.map((pomo, i) => {
          if (i === state.currentPomodoro) {
            return {
              ...pomo,
              started: formatDate.printFromDateObject('hh:mm', now)
            }
          }
          return pomo
        }),
        todayPomoCount: todayPomoCount || state.todayPomoCount,
        allTimePomoCount: allTimePomoCount || state.allTimePomoCount
      }
    })
  }

  render() {
    const currentPomodoro = this.state.pomodoros[this.state.currentPomodoro]

    return (
      <div className="Pomodoro">
        {
          currentPomodoro.type !== 'break' ?
          <WorkIcon /> :
          <CoffeeIcon />
        }
        <Timer 
          duration={currentPomodoro.duration}
          elapsedTime={this.state.elapsedTime} />
        <Controls 
          hasStarted={this.state.hasStarted}
          handleTimer={this.handleStartStopTimer}
          showHistory={this.handleHistoryVisibility} />
        {
          this.state.showHistory && 
          <History 
          pomos={this.state.pomodoros}
          todayPomoCount={this.state.todayPomoCount}
          allTimePomoCount={this.state.allTimePomoCount} />
        }
        <Footer />
      </div>
    );
  }
}

export default Pomodoro;

const POMODOROS = [
  { type: 'pomodoro', name: 'Pomodoro', id: 1, duration: 1500 },
  { type: 'break', name: 'Short break', id: 2, duration: 300 },
  { type: 'pomodoro', name: 'Pomodoro', id: 3, duration: 1500 },
  { type: 'break', name: 'Short break', id: 4, duration: 300 },
  { type: 'pomodoro', name: 'Pomodoro', id: 5, duration: 1500 },
  { type: 'break', name: 'Short break', id: 6, duration: 300 },
  { type: 'pomodoro', name: 'Pomodoro', id: 7, duration: 1500 },
  { type: 'break', name: 'Long break', id: 8, duration: 900 }
]