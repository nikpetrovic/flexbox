import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group' ;
import './PopupAlerts.less'

class PopupAlerts extends Component {
  popovers = [

  ]

  render() {
    return (
      <div className="popup-alerts">
        <h1>PopupAlerts</h1>
        <ReactCSSTransitionGroup transitionName='fadeUpDown' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          { this.popovers }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

PopupAlerts.propTypes = {}
PopupAlerts.defaultProps = {}

export default PopupAlerts
