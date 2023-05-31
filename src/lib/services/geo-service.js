import http from '../http/axios';

export default class GeoService {

    static getLocations = (searchTerm) => {
        return http.post('/location/autocomplete', { settlement: searchTerm } )
    }

    static getLocationCoordinates = (searchTerm) => {
        return http.post('/location', { settlement: searchTerm })
    }
}