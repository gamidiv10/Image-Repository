import React, { Component } from "react";
import passwordHash from "password-hash";
import axios from "axios";
import { createBrowserHistory as history } from "history";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.passwordVerified = false;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { userId, password } = this.state;
    axios
      .get(`/users/${userId}`)
      .then((response) => {
        console.log("Success", response.data.data.password);
        this.passwordVerified = passwordHash.verify(password, response.data.data.password)
        this.passwordVerified ? history().push('/home') : console.log("Incorrect Password")

      })
      .catch((error) => console.log(error.message));

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="registrationForm">
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={this.state.userId}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
