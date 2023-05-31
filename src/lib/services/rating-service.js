import http from '../http/axios';

export default class RatingService {
    static create = (data) => {
        return http.post('/rating', data)
    }
    static getByUserID = (userID) => {
        return http.get(`/rating/${userID}`)
    }

    static delete = (ratingID) => {
        return http.delete(`/rating/${ratingID}`)
    }
}