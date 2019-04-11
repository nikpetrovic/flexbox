import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './PopupNotifications.less'
import { map, find, forEach, filter } from 'lodash'
import NotificationItem from './NotificationItem'

class PopupNotifications extends PureComponent {
  state = { notifications: [] }

  notificationTimeouts = {}

  constructor(props) {
    super(props)

    props.addNotification(this.addNotification)
    props.clearAllNotifications(this.clearAllNotifications)
    props.removeNotification(this.markNotificationForRemoval)
  }

  addNotification = (type, title, description) => {
    const notifications = [...this.state.notifications]
    const id = Date.now()
    if (this.props.config.position.indexOf('top') > -1) {
      notifications.push({ id, type, title, description })
    } else {
      notifications.splice(0, 0, { id, type, title, description })
    }
    this.setState({ notifications })
    console.log()
  }

  clearAllNotifications = () => {
    const notifications = _.map(this.state.notifications, n => ({ ...n, _closeImmediately: true }))
    this.setState({ notifications })
  }

  removeNotification = id => {
    const timeout = setTimeout(() => {
      const notifications =
        filter(this.state.notifications, item => {
          return item.id !== id
        }) || []
      this.setState({
        notifications,
      })

      delete this.notificationTimeouts[id]
    }, 200)

    this.notificationTimeouts[id] = timeout
  }

  markNotificationForRemoval = id => {
    const notificationToRemove = find(this.state.notifications, item => item.id === id)
    if (notificationToRemove) {
      this.setState({
        notifications: map(this.state.notifications, n => {
          if (n.id === id) {
            n._closeImmediately = true
            return n
          }
          return n
        }),
      })
    }
  }

  onRemove = id => {
    this.removeNotification(id)
  }

  render() {
    const { config } = this.props
    const { notifications } = this.state
    return (
      <div className="popup-notifications">
        {map(notifications, n => (
          <NotificationItem
            key={n.id}
            id={n.id}
            title={n.title}
            type={n.type}
            description={n.description}
            onClose={this.onRemove}
            config={config}
            closeImmediately={n._closeImmediately}
          />
        ))}
      </div>
    )
  }

  componentWillUnmount = () => {
    forEach(this.notificationTimeouts, t => clearTimeout(t))
  }
}

PopupNotifications.propTypes = {
  config: PropTypes.shape({
    position: PropTypes.oneOf([
      'top-left',
      'top-right',
      'top-center',
      'bottom-left',
      'bottom-right',
      'bottom-center',
    ]),
    animationDuration: PropTypes.number,
    autoHide: PropTypes.boolean,
    lifetime: PropTypes.number,
  }),
}
PopupNotifications.defaultProps = {}

export default PopupNotifications
