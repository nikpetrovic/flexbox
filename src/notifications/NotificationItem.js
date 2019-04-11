import React, { Component } from 'react'
import './NotificationItem.less'

const ICONS = {
  INFO: 'info',
  SUCCESS: 'check',
  WARNING: 'warning',
  ERROR: 'times',
}

export default class NotificationItem extends Component {
  state = { adding: true, removing: false }

  getClassNames = (adding, removing) => {
    let classNames = ''
    if (adding) {
      classNames += ' adding'
    }
    if (removing) {
      classNames += ' removing'
    }

    return classNames
  }

  close = () => {
    this.setState({ removing: true })
    this.props.onClose(this.props.id)
  }

  render() {
    const { id, type, title, description, onClose } = this.props
    const { adding, removing } = this.state
    return (
      <div
        className={`notification-item ${type.toLocaleLowerCase()} ${this.getClassNames(
          adding,
          removing
        )}`.trim()}
      >
        <div className="row-header">
          <i className={`${ICONS[type]} icon circle`} />
        </div>
        <div className="main">
          <div className="header">
            <div className="title">{title}</div>
            <div className="close-notification">
              <i className="times icon small" onClick={this.close} id={id} />
            </div>
          </div>
          {description && <div className="description">{description}</div>}
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { onClose, id, config } = this.props
    this.adding = setTimeout(() => {
      this.setState({ adding: false })
    }, 200)

    if (config.autoHide) {
      this.removing = setTimeout(() => {
        this.setState({ removing: true })
        onClose(id)
      }, config.lifetime)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.closeImmediately && this.props.closeImmediately !== prevProps.closeImmediately) {
      this.close()
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.adding)
    clearTimeout(this.removing)
  }
}
