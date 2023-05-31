import http from '../http/axios'

export default class UserService {
  static create = (data) => {
    return http.post('/users', data)
  };

  static getByID = (userID) => {
    return http.get(`/users/${userID}`);
  };

  static update = (data, userID) => {
    return http.patch(`/users/${userID}`, data);
  };

  static delete = (userID) => {
    return http.delete(`/users/${userID}`);
  };

  static updateAvatar = (userID, data) => {
    return http.post(`/users/${userID}/avatar`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}
