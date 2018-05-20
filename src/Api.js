//axios para fazer requisições http
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const loadGenres = () => api.get("genres");
export const salvaSerie = novaSerie => api.post("series", novaSerie);
export const loadSeriesByGenre = genre => api.get("series?genre=" + genre);

//Metodos para utilização de Verbos http
const apis = {
  loadGenres,
  salvaSerie
};

export default apis;
