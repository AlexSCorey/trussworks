import axios from 'axios';

export default function getPlanets(pageNumber) {
  return axios.get(`https://swapi.dev/api/planets/?page=${pageNumber}`);
}
