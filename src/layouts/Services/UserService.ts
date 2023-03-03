import axios from 'axios';
import authHeader from './AuthHeader';

const baseUrl = 'http://localhost:8080';

//we add a HTTP header when requesting authorized resource

class UserService {
  getPublicContent() {
    return axios.get(baseUrl + '/all');
  }

  getUserBoard() {
    return axios.get(baseUrl + '/user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(baseUrl + '/admin', { headers: authHeader() });
  }
}

export default new UserService();