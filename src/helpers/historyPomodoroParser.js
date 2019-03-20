import getISOWeek from "date-fns/get_iso_week";

export function getPomodorosPerDay(allPomodorosMade) {
  if (!allPomodorosMade.length) return 0;

  const result = allPomodorosMade.reduce((acc, pomo) => {
    acc[getParsedFullDate(pomo)] = acc[getParsedFullDate(pomo)] + 1 || 1;
    return acc;
  }, {});
  return result;
}

export function getPomodorosPerWeek(pomodorosPerDay) {
  if (!pomodorosPerDay) return 0;

  const result = Object.keys(pomodorosPerDay).reduce((acc, pomo) => {
    acc[getParsedWeekAndYear(pomo)] =
      (acc[getParsedWeekAndYear(pomo)] || 0) + pomodorosPerDay[pomo];
    return acc;
  }, {});
  return result;
}

export function getPomodorosPerMonth(pomodorosPerDay) {
  if (!pomodorosPerDay) return 0;

  const result = Object.keys(pomodorosPerDay).reduce((acc, pomo) => {
    acc[getParsedMonthAndYear(pomo)] =
      (acc[getParsedMonthAndYear(pomo)] || 0) + pomodorosPerDay[pomo];
    return acc;
  }, {});
  return result;
}

export function getAveragePomos(pomos) {
  if (!pomos) return 0;
  return (
    Object.keys(pomos).reduce((acc, pomo) => acc + pomos[pomo], 0) /
    Object.keys(pomos).length
  ).toFixed(1);
}

export function getTodayPomos(pomodorosPerDay) {
  return pomodorosPerDay[getParsedFullDate(Date.now())] || 0;
}

export function getThisWeekPomos(pomodorosPerWeek) {
  return pomodorosPerWeek[getParsedWeekAndYear(Date.now())] || 0;
}

export function getThisMonthPomos(pomodorosPerMonth) {
  return pomodorosPerMonth[getParsedMonthAndYear(Date.now())] || 0;
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
