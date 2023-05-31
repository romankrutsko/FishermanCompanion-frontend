import http from '../http/axios';

export default class CategoryService {
    static getAll = () => {
        return http.get('/categories/all')
    }
}