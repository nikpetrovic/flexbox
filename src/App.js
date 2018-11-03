import React, { Component } from 'react'
import logo from './logo.svg'
import './App.less'
import SideMenuLayout from './SideMenuLayout'
import "./semantic-theme/semantic.less"
import {Button, Icon} from 'semantic-ui-react'
import VerticalMenu from "./components/VerticalMenu";
import AppHeader from "./components/AppHeader";

class App extends Component {
  renderChildrent = () => {
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
          header={<AppHeader/>}
          sideMenu={<VerticalMenu/>}
          defaultMenuVisible
        >
          {this.renderChildrent()}
        </SideMenuLayout>
      </div>
    )
  }
}

export default App
