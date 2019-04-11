import React, { Component } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'

export class AppHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          <img src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>

        <Menu.Item>
          <Icon name="bars" sidemenutoggle="true" size="large" style={{ cursor: 'pointer' }} />
        </Menu.Item>

        <Menu.Item
          name="features"
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          Testimonials
        </Menu.Item>

        <Menu.Item name="sign-in" active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
          Sign-in
        </Menu.Item>
      </Menu>
    )
  }
}

AppHeader.propTypes = {}
AppHeader.defaultProps = {}

export default AppHeader
