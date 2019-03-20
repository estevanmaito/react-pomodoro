export default {
  create(field, data) {
    let storedData = JSON.parse(localStorage.getItem(field)) || [];
    storedData.push(data);
    localStorage.setItem(field, JSON.stringify(storedData));
  },

  read(field) {
    return JSON.parse(localStorage.getItem(field));
  },

  getTodaysPomodoros() {
    const ALL_POMOS = this.read("pomodoro") || [];
    return ALL_POMOS.filter(pomo => {
      const POMO_DATE = new Date(pomo).getDate();
      const TODAY_DATE = new Date().getDate();
      return POMO_DATE === TODAY_DATE;
    });
  },

  getAllTimePomodoros() {
    return this.read("pomodoro") || [];
  }
};
