import React, { Component } from "react";
import { Link } from "react-router-dom";

//Components
import api from "../Api";

class Home extends Component {
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
    const divStyle = {
      marginRight: "10px",
      marginTop: "30px",
      transition: "all .2s"
    };
    return (
      <Link key={genre} to={`/series/${genre}`}>
        <button
          style={divStyle}
          key={genre}
          type="button"
          className="btn btn-default"
        >
          {genre}
        </button>
      </Link>
    );
  }
  render() {
    return (
      <div>
        <section id="intro" className="intro-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1>
                  <img
                    src="/images/logo.png"
                    className="img-responsive center-block"
                  />
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
          <div className="container">
            {/* chaves para indicar que teremos javascript */}
            {this.state.isLoading && <span>Aguarde Carregando...</span>}
            {/* Difrente de carregando mostra o state genres */}
            {!this.state.isLoading && (
              <div className="text-center">
                {this.state.genres.map(this.renderGenreLink)}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
