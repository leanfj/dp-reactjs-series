import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import api from '../Api';
import { storageImg } from '../connectFirebase';

const statusSeries = {
  watched: 'Assitido',
  watching: 'Assitindo',
  toWatch: 'Assitir'
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
      isLoading: false,
      redirect: false
    };

    // Utilização do bind para referenciar o this para dentro do metodo salvarSerie
    this.salvarSerie = this.salvarSerie.bind(this);
  }
  //quando componente esta montado
  componentDidMount() {
    //Define que esta carregando os dados de forma assincorna o then so executa quando finaliza o carregamento
    this.setState({ isLoading: true });
    api.loadGenres().then(data => {
      console.log(data);
      this.setState({
        isLoading: false,
        //carregas os dados recebidos para o array genres
        genres: data
      });
    });
  }

  // Metodo para salvar
  salvarSerie() {
    // Objeto que com a utilização do ref vai pegar todos os values
    // const novaSerie = {
    //   name: this.refs.nome.value,
    //   status: this.refs.status.value,
    //   genre: this.refs.genero.value,
    //   comments: this.refs.comentario.value
    // };

    //Adcionar imagem
    const arquivo = this.refs.inputImage.files[0];
    const { name, size, type } = arquivo;
    const ref = storageImg.ref(name);
    ref.put(arquivo).then(img => {
      console.log(img.metadata);
      img.ref.getDownloadURL().then(downloadURL => {
        console.log(downloadURL);
        const novaSerie = {
          name: this.refs.nome.value,
          status: this.refs.status.value,
          genre: this.refs.genero.value,
          comments: this.refs.comentario.value,
          thumbnail: downloadURL,
          imagem: img.metadata.fullPath
        };
        api.salvaSerie(novaSerie).then(res => {
          this.setState({ redirect: '/series/' + this.refs.genero.value });
          console.log(res.key);
          console.log(novaSerie);
        });
      });
    });

    // api.salvaSerie(novaSerie).then(res => {
    //   this.setState({ redirect: '/series/' + this.refs.genero.value });
    //   console.log(res.key);
    //   console.log(novaSerie);
    // });
  }

  render() {
    return (
      <section className="intro-section">
        {this.state.redirect && <Redirect to={this.state.redirect} />}
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
            <div className="form-group col-md-12">
              <input type="file" id="inputImage" ref="inputImage" />
              <p className="help-block text-left">
                Selecione imagem de thumbnail
              </p>
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

export default NovaSerie;
