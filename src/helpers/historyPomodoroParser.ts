import getISOWeek from 'date-fns/get_iso_week'

export function getPomodorosPerDay(allPomodorosMade: number[]): {} {
  if (!allPomodorosMade.length) return 0

  const result = allPomodorosMade.reduce((acc: any, pomo: any): {} => {
    (acc as any)[getParsedFullDate(pomo)] = acc[getParsedFullDate(pomo)] + 1 || 1
    return acc
  }, {})
  return result
}

export function getPomodorosPerWeek(pomodorosPerDay: {}): {} {
  if (!pomodorosPerDay) return 0

  const result = Object.keys(pomodorosPerDay).reduce((acc, pomo) => {
    (acc as any)[getParsedWeekAndYear(pomo)] = ((acc as any)[getParsedWeekAndYear(pomo)] || 0) + (pomodorosPerDay as any)[pomo]
    return acc
  }, {})
  return result
}

export function getPomodorosPerMonth(pomodorosPerDay: {}): {} {
  if (!pomodorosPerDay) return 0

  const result = Object.keys(pomodorosPerDay).reduce((acc, pomo) => {
    (acc as any)[getParsedMonthAndYear(pomo)] =
      ((acc as any)[getParsedMonthAndYear(pomo)] || 0) + (pomodorosPerDay as any)[pomo]
    return acc
  }, {})
  return result
}

export function getAveragePomos(pomos: {}): number | string {
  if (!pomos) return 0
  return (
    Object.keys(pomos).reduce((acc, pomo) => acc + (pomos as any)[pomo], 0) / Object.keys(pomos).length
  ).toFixed(1)
}

export function getTodayPomos(pomodorosPerDay: {}): number {
  return (pomodorosPerDay as any)[getParsedFullDate(Date.now())] || 0
}

export function getThisWeekPomos(pomodorosPerWeek: {}): number {
  return (pomodorosPerWeek as any)[getParsedWeekAndYear(Date.now())] || 0
}

export function getThisMonthPomos(pomodorosPerMonth: {}): number {
  return (pomodorosPerMonth as any)[getParsedMonthAndYear(Date.now())] || 0
}

function getParsedFullDate(date: number | string): string {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function getParsedWeekAndYear(date: number | string): string {
  const d = new Date(date)
  return `${getISOWeek(d)}, ${d.getFullYear()}`
}

function getParsedMonthAndYear(date: number | string): string {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}`
}
