import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import api from '../Api';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formStyle = {
      maxWidth: '320px',
      margin: '0 auto',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px 2px #00000045',
      padding: '10px'
    };
    return (
      <section className="intro-section">
        <h1>LOGIN</h1>
        <div className="container">
          <form style={formStyle}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
