//import ES6
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

//Components
import Login from './components/Login';
import Home from './components/Home';
import NovaSerie from './components/NovaSerie';
import EditarSerie from './components/EditarSerie';
import Series from './components/Series';
import { authUser } from './connectFirebase';

//Functional stateless component
const Sobre = () => (
  <div className="intro-section">
    <h1>Sobre</h1>
    <p>
      Atividade sendo realiza junto ao Minicurso de ReactJS do{' '}
      <a href="https://www.devpleno.com/">Dev-Pleno do Tulio Faria</a>
    </p>
    <p>
      Complemento das atividades sendo realizadas com intruções do Canal do
      youtube{' '}
      <a href="https://www.youtube.com/channel/UCqI7CYMy3nO8RrIqB64v2hQ">
        Reginaldo Santos
      </a>
    </p>
    <p>
      App Web para gerenciar as suas séries favoritas da Netflix utilizando o
      ReactJS.
    </p>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.logoutUsuario = this.logoutUsuario.bind(this);
  }

  logoutUsuario() {
    authUser.signOut().then(user => {
      console.log('Usuário deslogado', this);
    });
  }
  //renderiza na tela
  render() {
    //retorna somente um unico elemento
    //JSX tags com letras min são identificadas como tag HTML e tags com letras maius. são identificadas como Componentes
    return (
      <Router>
        <div>
          <nav
            className="navbar navbar-default navbar-fixed-top "
            role="navigation"
          >
            <div className="container ">
              <div className="navbar-header ">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand " href="#">
                  <img src="/images/logo.png" height="30" />
                </a>
              </div>
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav" id="navbar-nav">
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/nova-serie">Nova Série</Link>
                  </li>
                  <li>
                    <Link to="/sobre">Sobre</Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/">Login</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={this.logoutUsuario}>
                      Sair
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* Definicação de rotas utilizando react-router-dom */}
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/series/:genre" component={Series} />
          <Route exact path="/nova-serie" component={NovaSerie} />
          <Route exact path="/editar-serie/:id" component={EditarSerie} />
          <Route exact path="/sobre" component={Sobre} />
        </div>
      </Router>
    );
  }
}

export default App;
