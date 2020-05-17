import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
  constructor() {
    super ();
  this.state = {
    userId: "",
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    pwdConfirmation: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}
handleChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  });
}

handleSubmit(event) {
  event.preventDefault();
  const { userId, firstName, lastName, emailId, password } = this.state;
  axios.post('/users/register', {
    userId,
    firstName,
    lastName,
    emailId,
    password
  })
  .then(response => {
    console.log(response);
  }).catch(
      error => console.log(error.message)
    );    
    
}

  render() {
  
  return (
    <div>
      <form onSubmit={this.handleSubmit} className="registrationForm">
        <input type="text" name="userId" placeholder="User ID" value={this.state.userId} onChange={this.handleChange} required/>
        <br />
        <br />
        <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/>

        <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required/>
        <br />
        <br />
        <input type="email" name="emailId" placeholder="Email" value={this.state.emailId} onChange={this.handleChange} required/>
        <br />
        <br />

        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
        <br />
        <br />

        <input type="password" name="pwdConfirmation" placeholder="Password confirmation" value={this.state.pwdConfirmation} onChange={this.handleChange} required/>
        <br />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
  }
}
