import React, { Component } from "react";

class Teste extends Component {
  render() {
    //this.props forma de enviar dados entre componentes
    return <h1>Leandro Ferreira {this.props.cargo}</h1>;
  }
}

export default Teste;
