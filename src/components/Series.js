import React, { Component } from "react";

//Components
import api from "../Api";

const statusSeries = {
  watched: "Assitido",
  watching: "Assitindo",
  toWatch: "Assitir"
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
    api.loadSeriesByGenre(this.props.match.params.genre).then(res => {
      this.setState({ isLoading: false, series: res.data });
    });
  }

  deleteSeries(argId) {
    console.log(argId);
    api.deleteSeries(argId).then(res => {
      this.loadData();
      console.log(res);
    });
  }

  renderSeries(series) {
    const estilo = {
      btn: {
        marginRight: 10
      }
    };
    return (
      <div className="item col-sm-6 col-md-4">
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
            <div className="row">
              <div className="col-md-12">
                <p className="lead">
                  {series.genre} / {statusSeries[series.status]}
                </p>
              </div>
              <div className="col-md-12">
                <a style={estilo.btn} className="btn btn-success">
                  Editar
                </a>
                <a
                  className="btn btn-danger"
                  onClick={() => this.deleteSeries(series.id)}
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
