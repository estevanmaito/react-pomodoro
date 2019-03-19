import React from "react";
import HistoryList from "./HistoryList/HistoryList";
import HistoryStats from "./HistoryStats/HistoryStats";
import getISOWeek from "date-fns/get_iso_week";

const History = props => {
  const allPomodorosMade = props.allPomodorosMade;

  function getPomodorosPerDay(allPomodorosMade) {
    if (!allPomodorosMade.length) return 0;

    const result = allPomodorosMade.reduce((acc, pomo) => {
      acc[getParsedFullDate(pomo)] = acc[getParsedFullDate(pomo)] + 1 || 1;
      return acc;
    }, {});
    return result;
  }

  function getPomodorosPerWeek(pomodorosPerDay) {
    if (!pomodorosPerDay) return 0;

    const result = Object.keys(pomodorosPerDay).reduce((acc, pomo) => {
      acc[getParsedWeekAndYear(pomo)] =
        (acc[getParsedWeekAndYear(pomo)] || 0) + pomodorosPerDay[pomo];
      return acc;
    }, {});
    return result;
  }

  function getPomodorosPerMonth(pomodorosPerDay) {
    if (!pomodorosPerDay) return 0;

    const result = Object.keys(pomodorosPerDay).reduce((acc, pomo) => {
      acc[getParsedMonthAndYear(pomo)] =
        (acc[getParsedMonthAndYear(pomo)] || 0) + pomodorosPerDay[pomo];
      return acc;
    }, {});
    return result;
  }

  function getParsedFullDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function getParsedWeekAndYear(date) {
    const d = new Date(date);
    return `${getISOWeek(d)}, ${d.getFullYear()}`;
  }

  function getParsedMonthAndYear(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
  }

  function getAveragePomos(pomos) {
    if (!pomos) return 0;
    return (
      Object.keys(pomos).reduce((acc, pomo) => acc + pomos[pomo], 0) /
      Object.keys(pomos).length
    ).toFixed(1);
  }

  function getTodayPomos(pomodorosPerDay) {
    return pomodorosPerDay[getParsedFullDate(Date.now())] || 0;
  }

  function getThisWeekPomos(pomodorosPerWeek) {
    return pomodorosPerWeek[getParsedWeekAndYear(Date.now())] || 0;
  }

  function getThisMonthPomos(pomodorosPerMonth) {
    return pomodorosPerMonth[getParsedMonthAndYear(Date.now())] || 0;
  }

  const pomosPerDay = getPomodorosPerDay(allPomodorosMade);
  const pomosPerWeek = getPomodorosPerWeek(pomosPerDay);
  const pomosPerMonth = getPomodorosPerMonth(pomosPerDay);
  const avgPomosPerDay = getAveragePomos(pomosPerDay);
  const avgPomosPerWeek = getAveragePomos(pomosPerWeek);
  const avgPomosPerMonth = getAveragePomos(pomosPerMonth);
  const allTimePomos = allPomodorosMade.length;
  const pomosToday = getTodayPomos(pomosPerDay);
  const pomosThisWeek = getThisWeekPomos(pomosPerWeek);
  const pomosThisMonth = getThisMonthPomos(pomosPerMonth);

  return (
    <div style={{ textAlign: "center" }}>
      <HistoryList pomos={props.pomos} />
      <HistoryStats value={pomosToday} label="Today" avg={avgPomosPerDay} />
      <HistoryStats
        value={pomosThisWeek}
        label="This Week"
        avg={avgPomosPerWeek}
      />
      <HistoryStats
        value={pomosThisMonth}
        label=" This Month"
        avg={avgPomosPerMonth}
      />
      <HistoryStats value={allTimePomos} label="All time" />
      <p>Pomos today: {props.todayPomoCount}</p>
      <p>Pomos history: {props.allTimePomoCount}</p>
    </div>
  );
};

export default React.memo(History);
