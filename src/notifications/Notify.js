import PopupNotifications from './PopupNotifications'
import NotificationTypes from './NotificationTypes'
import { includes, forEach } from 'lodash'
import ReactDOM from 'react-dom'
import './popupNotificationsConfig'

const DEFAULT_PROPS = {
  position: 'top-left',
  autoHide: true,
  lifetime: 5000,
}

const getConfig = () => {
  const keys = Object.keys(DEFAULT_PROPS)
  const loadedConfig = window.__popupNotificationsConfig
  const config = DEFAULT_PROPS
  forEach(keys, key => {
    if (loadedConfig.hasOwnProperty(key)) {
      config[key] = loadedConfig[key]
    }
  })
  return config
}

const renderPopupNotificationContainer = notificationManger => {
  let container = document.getElementById('popup-notifications-id')
  const config = getConfig()
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'popup-notifications-id')
    container.classList.add('popup-notifications-container')
    container.classList.add(config.position)
    document.body.appendChild(container)
  }

  ReactDOM.render(
    <PopupNotifications
      key={Date.now()}
      addNotification={notificationManger._bindAddNotification}
      clearAllNotifications={notificationManger._bindClearAll}
      removeNotification={notificationManger._bindRemoveNotification}
      config={config}
    />,
    container
  )
}

export default class Notify {
  constructor() {
    renderPopupNotificationContainer(this)
  }

  _bindAddNotification = handler => {
    this.notificationHandler = handler
  }

  _bindRemoveNotification = handler => {
    this.removeNotification = handler
  }

  _bindClearAll = handler => {
    this.clearAllHandler = handler
  }

  notify = (type, title, description) => {
    this.notificationHandler(type, title, description)
  }

  info = (title, description) => {
    this.notify(NotificationTypes.INFO, title, description)
  }

  success = (title, description) => {
    this.notify(NotificationTypes.SUCCESS, title, description)
  }

  warning = (title, description) => {
    this.notify(NotificationTypes.WARNING, title, description)
  }

  error = (title, description) => {
    this.notify(NotificationTypes.ERROR, title, description)
  }

  clearAll = () => {
    this.clearAllHandler()
  }
}
