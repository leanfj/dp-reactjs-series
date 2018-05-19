//axios para fazer requisições http
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const loadGenres = () => api.get("genres");

//Metodos para utilização de Verbos http
const apis = {
  loadGenres
};

export default apis;
