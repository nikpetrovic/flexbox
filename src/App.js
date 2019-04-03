import React, { Component } from 'react'
import logo from './logo.svg'
import './App.less'
import SideMenuLayout from './SideMenuLayout'
import TodoList from './TodoList'
import './semantic-theme/semantic.less'
import { Button, Message } from 'semantic-ui-react'

class App extends Component {
  renderChildren = () => {
    const cmps = []
    for (let i = 0; i < 100; i++) {
      cmps.push(
        <div key={i} style={{ backgroundColor: 'yellow' }}>{`This is component ${i + 1}`}</div>
      )
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
          sideMenu={props => (
            <div>
              <Message error header="Submit Failed" content="Please complete all required fields" />
              <ul>
                <li>optio one</li>
                <li>optio two</li>
                <li>optio three</li>
                <li>optio one</li>
                <li>optio two</li>
                <li>optio three</li>
                <li>optio one</li>
                <li>optio two</li>
                <li>optio three</li>
              </ul>
              <TodoList />
            </div>
          )}
          defaultMenuVisible
        >
          {this.renderChildren()}
        </SideMenuLayout>
      </div>
    )
  }
}

export default App
