import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
//Components
import base, { authUser } from '../connectFirebase';
import api from '../Api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };

    this.loginUsuario = this.loginUsuario.bind(this);
  }

  loginUsuario() {
    const usuario = {
      email: this.refs.email.value,
      senha: this.refs.senha.value
    };
    authUser
      .signInWithEmailAndPassword(usuario.email, usuario.senha)
      .then(user => {
        console.log('Usuário logado', user);
        this.setState({ redirect: '/home' });
      })
      .catch(err => {
        console.log('Error', err);
      });
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
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <h1>LOGIN</h1>
        <div className="container">
          <form style={formStyle}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                ref="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                ref="senha"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.loginUsuario}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
