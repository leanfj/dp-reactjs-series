import React, { Component } from "react";
import api from "../Api";

const statusSeries = {
  watched: "Assitido",
  watching: "Assitindo",
  toWatched: "Assitir"
};

class NovaSerie extends Component {
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

    // Utilização do bind para referenciar o this para dentro do metodo salvarSerie
    this.salvarSerie = this.salvarSerie.bind(this);
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

  // Metodo para salvar
  salvarSerie() {
    // Objeto que com a utilização do ref vai pegar todos os values
    const novaSerie = {
      nome: this.refs.nome.value,
      status: this.refs.status.value,
      genero: this.refs.genero.value,
      comentario: this.refs.comentario.value
    };
    api.salvaSerie(novaSerie).then(res => console.log(res));
    console.log(novaSerie);
  }

  render() {
    return (
      <section className="intro-section">
        <h1>Nova Série</h1>
        <div className="container">
          <form>
            <div className="form-group col-md-6">
              <label htmlFor="nome">Nome da Série</label>
              {/* ref forma de referenciar o element */}
              <input
                type="text"
                id="nome"
                ref="nome"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Status</label>
              <select
                name="status"
                id="status"
                ref="status"
                className="form-control"
              >
                {/* Mapeando chaves do objeto estaticos criado */}
                {Object.keys(statusSeries).map(key => (
                  <option key={key} value={key}>
                    {statusSeries[key]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>Gênero</label>
              <select
                name="genero"
                id="genero"
                ref="genero"
                className="form-control"
              >
                {/* Verificando constructo state para pegar o generos recebidos via data da API */}
                {this.state.genres.map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="comentario">Comentário</label>
              <textarea
                id="comentario"
                ref="comentario"
                className="form-control"
              />
            </div>
            {/* utilização de eventos onClick no button ??? */}
            <button
              onClick={this.salvarSerie}
              type="button"
              className="btn btn-primary"
            >
              Slavar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default NovaSerie;
