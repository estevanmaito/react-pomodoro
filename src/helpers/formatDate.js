export default {
  printFromDateObject(format, time) {
    const DATE = new Date(time)
    switch (format) {
      case 'hh:mm':
        const HOUR = DATE.getHours()
        const MIN = DATE.getMinutes()
        return `${HOUR}:${MIN}`
      default:
        return time
    }
  },
  printFromSeconds(seconds) {
    const HOUR_IN_SECONDS = 3600
    const MINUTE_IN_SECONDS = 60
    const MIN = Math.floor(seconds % HOUR_IN_SECONDS / MINUTE_IN_SECONDS)
    const SEC = Math.floor(seconds % HOUR_IN_SECONDS % MINUTE_IN_SECONDS)
    return `${MIN < 10 ? '0' : ''}${MIN}:${SEC < 10 ? '0' : ''}${SEC}`
  }
}