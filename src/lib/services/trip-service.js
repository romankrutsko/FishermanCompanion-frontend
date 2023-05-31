import http from "../http/axios"

export default class TripService {
    static getFutureTrips = (userID) => {
        return http.get(`/posts/future/${userID}`)
    }

    static getFinishedTrips = (userID, days = 7) => {
        return http.get(`/posts/finished/${userID}`, { params: { days: days } })
    }

    static getFutureTripMembers = (postID) => {
        return http.get(`/users/future/members/${postID}`)
    }

    static getFinishedTripMembers = (postID) => {
        return http.get(`/users/finished/members/${postID}`)
    }
}