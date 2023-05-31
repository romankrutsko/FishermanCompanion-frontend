import http from '../http/axios';

export default class RequestService {
    static getAll = () => {
        return http.get('/requests')
    }

    static create = (data) => {
        return http.post('/requests', data)
    }

    static edit = (requestID, data) => {
        return http.post(`/requests/${requestID}`, data)
    }

    static delete = (requestID) => {
        return http.delete(`/requests/${requestID}`)
    }

    static updateStatus = (requestID, status) => {
        return http.patch(`/requests/${requestID}`, status)
    }

    static getByPostID = (postID) => {
        return http.get(`/requests/${postID}`)
    }
}