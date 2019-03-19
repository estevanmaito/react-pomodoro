import React from 'react'
import cls from './HistoryStats.module.css';

const HistoryStats = ({value, label, avg}) => {
  return (
    <ul className={cls.historyStats}>
      <li className={cls.value}>{value}</li>
      <li className={cls.label}>{label}</li>
      {avg && <li className={cls.avg}>avg. {avg}</li>}
    </ul>
  )
}

export default HistoryStats
