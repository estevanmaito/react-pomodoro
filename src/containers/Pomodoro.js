import React, { useEffect, useState } from "react";
import TimerTypeIcon from "../components/TimerTypeIcon/TimerTypeIcon";
import Timer from "../components/Timer/Timer";
import Controls from "../components/Controls/Controls";
import History from "../components/History/History";
import Footer from "../components/Footer/Footer";

import DB from "../helpers/localStorage";
import formatDate from "../helpers/formatDate";

import "./Pomodoro.css";
import bell from "../assets/audio/bell.mp3";

const Pomodoro = props => {
  const [pomodoros, setPomodoros] = useState(POMODOROS);
  const [showHistory, setShowHistory] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentPomodoro, setCurrentPomodoro] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [allPomodorosMade, setAllPomodorosMade] = useState([]);

  // For some reason, Chrome won't play the bell or create the Audio object
  // until the pomodoro tab is focused, for the first time
  const audio = new Audio(bell);

  useEffect(() => {
    setAllPomodorosMade(DB.getAllTimePomodoros());

    return function cleanup() {
      clearInterval(timer);
      setTimer(null);
    };
  }, []);

  const handleHistoryVisibility = () => {
    setShowHistory(!showHistory);
  };

  const handleStartStopTimer = () => {
    if (hasStarted) {
      if (
        window.confirm(
          "This will stop and reset the CURRENT timer. Are you sure?"
        )
      )
        stopTimer();
    } else {
      startTimer();
    }
  };

  const handleResetTimer = () => {
    if (
      window.confirm(
        "This will STOP and CLEAR all current pomodoros. Are you sure?"
      )
    )
      resetTimer();
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      // if timer reached 0, load next pomodoro
      if (elapsedTime === pomodoros[currentPomodoro].duration) {
        return nextPomo();
      }
      setElapsedTime(e => e + 1);
    }, 1000);
    setTimer(interval);

    savePomodoro();
    setHasStarted(true);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setPomodoros(
      pomodoros.map((pomo, i) => {
        if (i === currentPomodoro) {
          return {
            ...pomo,
            started: null
          };
        }
        return pomo;
      })
    );
    setElapsedTime(0);
    setTimer(null);
    setHasStarted(false);
  };

  const resetTimer = () => {
    clearInterval(timer);
    setPomodoros(POMODOROS);
    setHasStarted(false);
    setElapsedTime(0);
    setTimer(null);
    setCurrentPomodoro(0);
  };

  const nextPomo = () => {
    alert();
    // last pomodoro
    if (pomodoros.length - 1 === currentPomodoro) {
      return resetTimer();
    }

    setElapsedTime(0);
    setCurrentPomodoro(currentPomodoro + 1);
    savePomodoro();
  };

  // TODO: add notifications API
  const alert = () => {
    audio.play();
  };

  const savePomodoro = () => {
    const now = Date.now();

    // Only count a finished Pomodoro if it has moved to a break
    // and the timer is still running (hasStarted)
    // hasStarted prevents it from creating a new record on a restart
    // from a break
    if (pomodoros[currentPomodoro].type !== "pomodoro" && hasStarted) {
      DB.create("pomodoro", now);
      setAllPomodorosMade(DB.getAllTimePomodoros());
    }

    setPomodoros(
      pomodoros.map((pomo, i) => {
        if (i === currentPomodoro) {
          return {
            ...pomo,
            started: formatDate.printFromDateObject("hh:mm", now)
          };
        }
        return pomo;
      })
    );
  };

  return (
    <div className="Pomodoro">
      <TimerTypeIcon type={pomodoros[currentPomodoro].type} />
      <Timer
        duration={pomodoros[currentPomodoro].duration}
        elapsedTime={elapsedTime}
      />
      <Controls
        hasStarted={hasStarted}
        handleStartStopTimer={handleStartStopTimer}
        handleResetTimer={handleResetTimer}
        showHistory={handleHistoryVisibility}
      />
      {showHistory && (
        <History pomos={pomodoros} allPomodorosMade={allPomodorosMade} />
      )}
      <Footer />
    </div>
  );
};

export default Pomodoro;

const POMODOROS = [
  { type: "pomodoro", name: "Pomodoro", id: 1, duration: 5 },
  { type: "break", name: "Short break", id: 2, duration: 3 },
  { type: "pomodoro", name: "Pomodoro", id: 3, duration: 1500 },
  { type: "break", name: "Short break", id: 4, duration: 300 },
  { type: "pomodoro", name: "Pomodoro", id: 5, duration: 1500 },
  { type: "break", name: "Short break", id: 6, duration: 300 },
  { type: "pomodoro", name: "Pomodoro", id: 7, duration: 1500 },
  { type: "break", name: "Long break", id: 8, duration: 900 }
];
