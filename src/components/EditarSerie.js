import React, { Component } from "react";
import api from "../Api";
import { Redirect } from "react-router-dom";

const statusSeries = {
  watched: "Assitido",
  watching: "Assitindo",
  toWatch: "Assitir"
};

class EditarSerie extends Component {
  //life cicle react component?
  //Troca de State
  // Redux gerenciador de estados
  //States individualizados por component
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      isLoadin: false,
      redirect: false,
      series: {}
    };

    // Utilização do bind para referenciar o this para dentro do metodo salvarSerie
    this.salvarSerie = this.salvarSerie.bind(this);
  }
  //quando componente esta montado
  componentDidMount() {
    //Define que esta carregando os dados de forma assincorna o then so executa quando finaliza o carregamento
    this.setState({ isLoading: true });
    api.loadGenres().then(res => {
      this.setState({
        isLoading: false,
        //carregas os dados recebidos para o array genres
        genres: res.data
      });
    });
    api.loadSeriesById(this.props.match.params.id).then(res => {
      this.setState({ series: res.data });
      this.refs.genero.value = this.state.series.genre;
      this.refs.nome.value = this.state.series.name;
      this.refs.status.value = this.state.series.status;
      this.refs.comentario.value = this.state.series.comments;
      console.log(res.data);
    });
  }

  // Metodo para salvar
  salvarSerie() {
    // Objeto que com a utilização do ref vai pegar todos os values
    const novaSerie = {
      id: this.props.match.params.id,
      name: this.refs.nome.value,
      status: this.refs.status.value,
      genre: this.refs.genero.value,
      comments: this.refs.comentario.value
    };
    api.atualizaSerie(novaSerie).then(res => {
      this.setState({
        redirect: "/series/" + this.refs.genero.value
      });
    });
  }

  render() {
    return (
      <section className="intro-section">
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <h1>Editar Série</h1>
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
                defaultValue={this.state.series.name}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Status</label>
              <select
                name="status"
                id="status"
                ref="status"
                className="form-control"
                defaultValue={this.state.series.status}
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
                defaultValue={this.state.series.comments}
              />
            </div>
            {/* utilização de eventos onClick no button ??? */}
            <button
              onClick={this.salvarSerie}
              type="button"
              className="btn btn-primary"
            >
              Salvar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default EditarSerie;
