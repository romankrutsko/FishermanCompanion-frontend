import http from '../http/axios';

export default class PostService {
    static create = (data) => {
        return http.post('/posts', data)
    }

    static getAll = (skip, take) => {
        return http.get('/posts', { params: { skip: skip, take: take } })
    }

    static getByUserID = (userID, skip, take) => {
        return http.get(`/posts/${userID}`, { params: { skip: skip, take: take } })
    }

    static getByLocation = (data) => {
        return http.post('/posts/by-location', data)
    }

    static getByCategory = (data, { skip, take }) => {
        return http.post('/posts/by-category', data, { params: { skip, take } })
    }
    static update = (postID, data) => {
        return http.patch(`/posts/${postID}`, data)
    }

    static delete = (postID) => {
        return http.delete(`/posts/${postID}`)
    }
}