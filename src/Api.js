//axios para fazer requisições http
import axios from 'axios';
import base from './connectFirebase';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// export const loadGenres = () => api.get('genres');
export const loadGenres = () =>
  base.fetch('genres', {
    context: this,
    asArray: true
  });
// export const salvaSerie = novaSerie => api.post('series', novaSerie);
export const salvaSerie = novaSerie =>
  base.push('series', {
    data: novaSerie
  });
export const atualizaSerie = serie => api.put('series/' + serie.id, serie);
// export const loadSeriesByGenre = genre => api.get('series?genre=' + genre);
export const loadSeriesByGenre = genre =>
  base.fetch('series', {
    context: this,
    asArray: true,
    queries: {
      orderByChild: 'genre',
      equalTo: genre
    }
  });
// export const deleteSeries = id => api.delete('series/' + id);
export const deleteSeries = key => base.remove('series/' + key);

export const loadSeriesById = id => api.get('series/' + id);

//Metodos para utilização de Verbos http
const apis = {
  loadGenres,
  salvaSerie,
  atualizaSerie,
  loadSeriesByGenre,
  loadSeriesById,
  deleteSeries
};

export default apis;
