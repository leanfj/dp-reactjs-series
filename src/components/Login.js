import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import api from '../Api';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="intro-section">
        <h1>LOGIN</h1>
        <div className="container">
          <form>
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
            <button type="submit" className="btn btn-info">
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
