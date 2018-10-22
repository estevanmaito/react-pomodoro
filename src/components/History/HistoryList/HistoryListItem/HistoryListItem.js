import React from 'react'

import date from '../../../../helpers/formatDate'

const HistoryListItem = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{date.printFromSeconds(props.duration)}</td>
      <td>{props.started}</td>
    </tr>
  )
}

export default HistoryListItem
