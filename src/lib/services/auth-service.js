import http from '../http/axios';

export default class AuthService {
  static login = (data) => {
    return http.post('/auth/login', data);
  };

  static logout = () => {
    return http.post('/auth/logout');
  };
}