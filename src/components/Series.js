import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Components
import api from '../Api';

const statusSeries = {
  watched: 'Assitido',
  watching: 'Assitindo',
  toWatch: 'Assitir'
};

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      series: []
    };
    this.renderSeries = this.renderSeries.bind(this);
    this.loadData = this.loadData.bind(this);
    this.deleteSeries = this.deleteSeries.bind(this);
  }
  componentDidMount() {
    // this.setState({ isLoading: true });
    // api.loadSeriesByGenre(this.props.match.params.genre).then(res => {
    //   this.setState({
    //     isLoading: false,
    //     series: res.data
    //   });
    // });
    this.loadData();
  }

  loadData() {
    this.setState({ isLoading: true });
    api.loadSeriesByGenre(this.props.match.params.genre).then(data => {
      this.setState({ isLoading: false, series: data });
    });
  }

  deleteSeries(argKey) {
    // api.deleteSeries(argId).then(data => {
    //   this.loadData();
    // });
    api.deleteSeries(argKey).then(data => {
      // argKey = res.key;
      // console.log(this.state.series[0].key);
      // console.log(argKey);
      this.loadData();
    });
  }

  renderSeries(series) {
    const estilo = {
      btn: {
        marginRight: 10
      }
    };
    return (
      <div key={series.id} className="item col-sm-6 col-md-4">
        <div className="thumbnail">
          <img
            className="group list-group-image"
            src="http://placehold.it/400x250/000/fff"
            alt=""
          />
          <div className="caption">
            <h4 className="group inner list-group-item-heading">
              {series.name}
            </h4>
            <h4 className="group inner list-group-item-heading">{series.id}</h4>
            <div className="row">
              <div className="col-md-12">
                <p className="lead">
                  {series.genre} / {statusSeries[series.status]}
                </p>
              </div>
              <div className="col-md-12">
                <Link
                  style={estilo.btn}
                  className="btn btn-success"
                  to={'/editar-serie/' + series.id}
                >
                  Editar
                </Link>
                <a
                  className="btn btn-danger"
                  onClick={() => this.deleteSeries(series.key)}
                >
                  Excluir
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section id="intro" className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Séries {this.props.match.params.genre}</h1>

              {this.state.isLoading && (
                <div className="alert alert-info" role="alert">
                  Carregando
                </div>
              )}

              {!this.state.isLoading &&
                this.state.series.length === 0 && (
                  <div className="alert alert-warning" role="alert">
                    Nenhuma Série cadastrada
                  </div>
                )}
              <div id="series" className="row list-group">
                {/* Carregando lista de Series */}
                {!this.state.isLoading &&
                  this.state.series.map(this.renderSeries)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Series;
