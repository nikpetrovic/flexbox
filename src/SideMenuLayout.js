import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './SideMenuLayout.less'

class SideMenuLayout extends Component {
  state = { showSideMenu: true }

  componentWillMount() {
    this.setState({ showSideMenu: this.props.defaultMenuVisible })
  }

  renderPartial = cmp => {
    const component = cmp && typeof cmp === 'function' ? cmp() : cmp

    if (component) {
      const children = React.Children.map(component.props.children, child => {
        const { sidemenutoggle } = child.props

        if (sidemenutoggle) {
          return React.cloneElement(child, { ...child.props, onClick: this.onToggleSideMenu })
        }

        return child
      })

      if (children) {
        return React.cloneElement(component, { ...component.props, children: children })
      }

      return component
    }
  }

  onToggleSideMenu = () => {
    this.setState({ showSideMenu: !this.state.showSideMenu })
  }

  render() {
    const { sideMenu, header, footer } = this.props

    return (
      <div className="side-menu-layout">
        {sideMenu && (
          <div className="side-menu" ref={ref => (this.sideMenu = ref)}>
            {this.renderPartial(sideMenu)}
          </div>
        )}
        <div className="main-container">
          {header && <div className="header">{this.renderPartial(header)}</div>}
          <div className="body">{this.props.children}</div>
          {footer && <div className="footer">{this.renderPartial(footer)}</div>}
        </div>
      </div>
    )
  }

  recalculateSideMenuWidth = () => {
    if (!this.sideMenu) {
      return
    }

    const { showSideMenu } = this.state
    const sideMenu = ReactDOM.findDOMNode(this.sideMenu)

    const sideMenuStyle = window.getComputedStyle(sideMenu)
      ? window.getComputedStyle(sideMenu)
      : sideMenu.style

    const sideMenuWidth = window.parseFloat(sideMenuStyle.width)

    if (showSideMenu) {
      this.sideMenu.style.marginLeft = -sideMenuWidth + 'px'
      this.sideMenu.style.marginLeft = 'unset'
    } else {
      this.sideMenu.style.marginLeft = 'unset'
      this.sideMenu.style.marginLeft = -sideMenuWidth + 'px'
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevState.showSideMenu !== this.state.showSideMenu) {
      this.recalculateSideMenuWidth()
    }
  }

  componentDidMount() {
    if (this.state.showSideMenu) {
      this.recalculateSideMenuWidth()
    }
  }
}

SideMenuLayout.propTypes = {}
SideMenuLayout.defaultProps = {}

export default SideMenuLayout
