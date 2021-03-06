import React, { Component } from 'react';


export default class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      password: '',
      user: undefined
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    fetch("http://127.0.0.1:5000/users/verification", {
      method: "POST",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data == "User Verified") {
        fetch(`http://127.0.0.1:5000/users/get/${this.state.username}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => response.json())
        .then(data => {
          this.props.callback(data)
        })
      }
      else {
        console.log("user not verified")
      }
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="login-register-container">
          <div className="login-register-wrapper">
            <input className="username" type="text" name="username" onChange={this.handleChange} placeholder="Username"/>
            <input className="password" type="password" name="password" onChange={this.handleChange} placeholder="Password"/>
            <button className="register" onClick={this.handleSubmit}>LOGIN</button>
          </div>
        </div>
      </div>
    )
  }
}