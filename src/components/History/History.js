import React, { PureComponent } from 'react'
import HistoryList from './HistoryList/HistoryList'

class History extends PureComponent {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <HistoryList pomos={this.props.pomos} />
        <p>Pomos today: {this.props.todayPomoCount}</p>
        <p>Pomos history: {this.props.allTimePomoCount}</p>
      </div>
    )
  }
}

export default History
