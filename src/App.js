//import ES6
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//Components
import Teste from "./components/Teste";

class App extends Component {
  //renderiza na tela
  render() {
    //retorna somente um unico elemento
    return (
      /*JSX
      tags com letras min são identificadas como tag HTML e tags com letras maius. são identificadas como Componentes*/
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Modificando meu primeiro app React</p>
        <Teste cargo="Web Developer" />
      </div>
    );
  }
}

export default App;
