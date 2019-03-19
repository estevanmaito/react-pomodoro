import React, { Component } from "react";
import TimerTypeIcon from "../components/TimerTypeIcon/TimerTypeIcon";
import Timer from "../components/Timer/Timer";
import Controls from "../components/Controls/Controls";
import History from "../components/History/History";
import Footer from "../components/Footer/Footer";

import DB from "../helpers/localStorage";
import formatDate from "../helpers/formatDate";

import "./Pomodoro.css";
import bell from "../assets/audio/bell.mp3";

class Pomodoro extends Component {
  state = {
    pomodoros: POMODOROS,
    showHistory: true,
    hasStarted: false,
    currentPomodoro: 0,
    elapsedTime: 0,
    interval: null,
    todayPomoCount: 0,
    allTimePomoCount: 0,
    allPomodorosMade: []
  };

  // For some reason, Chrome won't play the bell or create the Audio object
  // until the pomodoro tab is focused, for the first time
  audio = new Audio(bell);

  componentDidMount = () => {
    const allTimePomodoros = DB.getAllTimePomodoros();
    this.setState({
      todayPomoCount: DB.getTodaysPomodoros().length,
      allTimePomoCount: allTimePomodoros.length,
      allPomodorosMade: allTimePomodoros
    });
  };

  handleHistoryVisibility = () => {
    this.setState(state => {
      return { showHistory: !state.showHistory };
    });
  };

  handleStartStopTimer = () => {
    if (this.state.hasStarted) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  };

  handleResetTimer = () => {
    this.resetTimer();
  };

  startTimer = () => {
    const interval = setInterval(() => {
      // if timer reached 0, load next pomodoro
      if (
        this.state.elapsedTime ===
        this.state.pomodoros[this.state.currentPomodoro].duration
      ) {
        return this.nextPomo();
      }
      this.setState(state => {
        return { elapsedTime: state.elapsedTime + 1 };
      });
    }, 1000);

    this.savePomodoro();
    this.setState({ interval, hasStarted: true });
  };

  stopTimer = () => {
    clearInterval(this.state.interval);
    this.setState(state => {
      return {
        pomodoros: state.pomodoros.map((pomo, i) => {
          if (i === state.currentPomodoro) {
            return {
              ...pomo,
              started: null
            };
          }
          return pomo;
        }),
        elapsedTime: 0,
        interval: null,
        hasStarted: false
      };
    });
  };

  resetTimer = () => {
    clearInterval(this.state.interval);
    this.setState({
      pomodoros: POMODOROS,
      hasStarted: false,
      elapsedTime: 0,
      interval: null,
      currentPomodoro: 0
    });
  };

  nextPomo = () => {
    this.alert();
    // last pomodoro
    if (this.state.pomodoros.length - 1 === this.state.currentPomodoro) {
      return this.resetTimer();
    }

    this.setState(state => {
      return {
        elapsedTime: 0,
        currentPomodoro: state.currentPomodoro + 1
      };
    });
    this.savePomodoro();
  };

  // TODO: add notifications API
  alert = () => {
    this.audio.play();
  };

  savePomodoro = () => {
    const currentPomodoro = this.state.pomodoros[this.state.currentPomodoro];
    const now = Date.now();
    let todayPomoCount = null;
    let allTimePomoCount = null;

    // Only count a finished Pomodoro if it has moved to a break
    // and the timer is still running (hasStarted)
    // hasStarted prevents it from creating a new record on a restart
    // from a break
    if (currentPomodoro.type !== "pomodoro" && this.state.hasStarted) {
      DB.create("pomodoro", now);
      todayPomoCount = DB.getTodaysPomodoros().length;
      allTimePomoCount = DB.getAllTimePomodoros().length;
    }

    this.setState(state => {
      return {
        pomodoros: state.pomodoros.map((pomo, i) => {
          if (i === state.currentPomodoro) {
            return {
              ...pomo,
              started: formatDate.printFromDateObject("hh:mm", now)
            };
          }
          return pomo;
        }),
        todayPomoCount: todayPomoCount || state.todayPomoCount,
        allTimePomoCount: allTimePomoCount || state.allTimePomoCount
      };
    });
  };

  render() {
    const currentPomodoro = this.state.pomodoros[this.state.currentPomodoro];

    return (
      <div className="Pomodoro">
        <TimerTypeIcon type={currentPomodoro.type} />
        <Timer
          duration={currentPomodoro.duration}
          elapsedTime={this.state.elapsedTime}
        />
        <Controls
          hasStarted={this.state.hasStarted}
          handleStartStopTimer={this.handleStartStopTimer}
          handleResetTimer={this.handleResetTimer}
          showHistory={this.handleHistoryVisibility}
        />
        {this.state.showHistory && (
          <History
            pomos={this.state.pomodoros}
            todayPomoCount={this.state.todayPomoCount}
            allTimePomoCount={this.state.allTimePomoCount}
            allPomodorosMade={this.state.allPomodorosMade}
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default Pomodoro;

const POMODOROS = [
  { type: "pomodoro", name: "Pomodoro", id: 1, duration: 1500 },
  { type: "break", name: "Short break", id: 2, duration: 300 },
  { type: "pomodoro", name: "Pomodoro", id: 3, duration: 1500 },
  { type: "break", name: "Short break", id: 4, duration: 300 },
  { type: "pomodoro", name: "Pomodoro", id: 5, duration: 1500 },
  { type: "break", name: "Short break", id: 6, duration: 300 },
  { type: "pomodoro", name: "Pomodoro", id: 7, duration: 1500 },
  { type: "break", name: "Long break", id: 8, duration: 900 }
];
