import React from 'react'

import date from '../../../../helpers/formatDate'

interface Props {
  name: string
  duration: number
  started: any
}

function HistoryListItem({name, duration, started}: Props) {
  return (
    <tr>
      <td>{name}</td>
      <td>{date.printFromSeconds(duration)}</td>
      <td>{started}</td>
    </tr>
  )
}

export default HistoryListItem
