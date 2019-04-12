import React, { Component } from 'react'
import logo from './logo.svg'
import './App.less'
import SideMenuLayout from './SideMenuLayout'
import TodoList from './TodoList'
import './semantic-theme/semantic.less'
import { Button, Message } from 'semantic-ui-react'
import VerticalMenu from './components/VerticalMenu'
import AppHeader from './components/AppHeader'

class App extends Component {
  renderChildren = () => {
    const cmps = []
    for (let i = 0; i < 100; i++) {
      cmps.push(<div key={i}>{`This is component ${i + 1}`}</div>)
    }
    return cmps
  }

  render() {
    return (
      <div className="App">
        <SideMenuLayout
          header={props => (
            <div>
              <button sidemenutoggle="true">toggle</button>
            </div>
          )}
          sideMenu={<VerticalMenu />}
          defaultMenuVisible
        >
          {this.renderChildren()}
        </SideMenuLayout>
      </div>
    )
  }
}

export default App
