import React from 'react'
import HistoryListItem from './HistoryListItem/HistoryListItem'

import cls from './HistoryList.module.css'

interface Props {
  pomos: Array<{id: number, name: string, duration: number, started?: any}>
}

function HistoryList({pomos}: Props) {
  return (
    <div>
      <table className={cls.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Length</th>
            <th>Started</th>
          </tr>
        </thead>
        <tbody>
          {pomos.map((pomo) => (
            <HistoryListItem
              key={pomo.id}
              name={pomo.name}
              duration={pomo.duration}
              started={pomo.started}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryList
