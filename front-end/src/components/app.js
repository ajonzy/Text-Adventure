import React, { Component } from 'react';

import Login from './auth/login';
import Register from './auth/register';
import Home from "./pages/home"
import Room from "./pages/room"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      characterSelected: false,
      user: {},
      character: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleCharacterSelect = this.handleCharacterSelect.bind(this)
  }

  handleLogin = (user) => {
    this.setState({
      loggedIn: true,
      characterSelected: false,
      user: user,
      character: {}
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      characterSelected: false,
      user: {},
      character: {}
    })
  }

  handleCharacterSelect = (character) => {
    this.setState({
      characterSelected: true,
      character: character
    })
  }

  render() {
    return (
      <div className='app'>
        <div className="header">
          <h1>Text Adventure</h1>
        </div>

        {this.state.characterSelected 
        ?
          <div className="character-selected">
            <button onClick={this.handleLogout}>Log Out</button>
            <Room player={this.state.user} character={this.state.character}/>
          </div>
        :
          <div className="character-selection">
            {this.state.loggedIn 
            ? 
              <div className="logged-in">
                <button onClick={this.handleLogout}>Log Out</button>
                <Home user={this.state.user} callback={this.handleCharacterSelect}/> 
              </div>
            : 
              <div className="auth">
                <Login callback={this.handleLogin}/>
                <Register callback={this.handleLogin}/>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}
