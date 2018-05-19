//import ES6
import React, { Component } from "react";

//Components
import api from "./Api";

class App extends Component {
  //life cicle react component?
  //Troca de State
  // Redux gerenciador de estados
  //States individualizados por component
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      isLoadin: false
    };
  }
  //quando componente esta montado
  componentDidMount() {
    //Define que esta carregando os dados de forma assincorna o then so executa quando finaliza o carregamento
    this.setState({ isLoadins: true });
    api.loadGenres().then(res => {
      console.log(res);
      this.setState({
        isLoading: false,
        //carregas os dados recebidos para o array genres
        genres: res.data
      });
    });
  }

  renderGenreLink(genre) {
    return <a href=""> {genre} </a>;
  }

  //renderiza na tela
  render() {
    //retorna somente um unico elemento
    return (
      /*JSX
      tags com letras min são identificadas como tag HTML e tags com letras maius. são identificadas como Componentes*/
      <div>
        <nav
          className="navbar navbar-default navbar-fixed-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header page-scroll">
              <a className="navbar-brand page-scroll" href="#page-top">
                <img src="/images/logo.png" height="30" />
              </a>
            </div>

            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <a href="">Menu item</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section id="intro" className="intro-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>
                  <img src="/images/logo.png" />
                </h1>
                <p>
                  Nunca mais esqueça uma série que você assistiu ou que alguém
                  lhe indicou.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          {/* chaves para indicar que teremos javascript */}
          {this.state.isLoading && <span>Aguarde Carregando...</span>}
          {/* Difrente de carregando mostra o state genres */}
          {!this.state.isLoading && (
            <div>
              Ver séries do genero{this.state.genres.map(this.renderGenreLink)}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default App;
