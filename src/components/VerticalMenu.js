import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, Menu } from 'semantic-ui-react'
import { notify } from '../notifications'

export class VerticalMenu extends Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onKeyPress = e => {
    if (e.charCode === 13) {
      notify.success('Search', `Search text: ${e.target.value}`)
      e.target.value = ''
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item name="inbox" active={activeItem === 'inbox'} onClick={this.handleItemClick}>
          <Label color="teal">1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item name="spam" active={activeItem === 'spam'} onClick={this.handleItemClick}>
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item name="updates" active={activeItem === 'updates'} onClick={this.handleItemClick}>
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search mail..." onKeyPress={this.onKeyPress} />
        </Menu.Item>
      </Menu>
    )
  }
}

VerticalMenu.propTypes = {}
VerticalMenu.defaultProps = {}

export default VerticalMenu
