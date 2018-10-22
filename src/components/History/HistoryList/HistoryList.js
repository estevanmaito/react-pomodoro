import React from 'react'
import HistoryListItem from './HistoryListItem/HistoryListItem'

const HistoryList = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Length</th>
            <th>Started</th>
          </tr>
        </thead>
        <tbody>
          {
            props.pomos.map(pomo => (
              <HistoryListItem
                key={pomo.id}
                name={pomo.name}
                duration={pomo.duration}
                started={pomo.started}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default HistoryList
