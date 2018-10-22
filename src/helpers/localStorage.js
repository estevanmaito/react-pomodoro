export default {
  create(field, data) {
    let storedData = this.read(field) ? this.read(field) : []
    storedData.push(data)
    localStorage.setItem(field, JSON.stringify(storedData))
  },

  read(field) {
    return JSON.parse(localStorage.getItem(field) ?
      localStorage.getItem(field) :
      false)
  },

  getTodaysPomodoros() {
    const ALL_POMOS = this.read('pomodoro')
    return ALL_POMOS.filter(pomo => {
      const POMO_DATE = new Date(pomo).getDate()
      const TODAY_DATE = new Date().getDate()
      return POMO_DATE === TODAY_DATE
    })
  },

  getAllTimePomodoros() {
    return this.read('pomodoro')
  }
}