import qs from 'qs';
import axios from 'axios';

class Api {
  apiUrl = 'http://localhost:8000'

  post = (url, body) => axios.post(`${this.apiUrl}${url}`, body);

  put = (url, body) => axios.put(`${this.apiUrl}${url}`, body);

  patch = (url, body) => axios.patch(`${this.apiUrl}${url}`, body);

  delete = (url, body) => axios.delete(`${this.apiUrl}${url}`, body);

  get = (url, query = {}) => axios.get(`${this.apiUrl}${url}`, { paramsSerializer: (params) => qs.stringify(params), params: query })
}

export default new Api();
