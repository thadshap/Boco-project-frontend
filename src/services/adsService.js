import axios from "axios";
let url = 'https://localhost:'
let port = "8443"

export default {

    /**
     * Method to get a list of ads who are nearby the user
     *
     * @param userId id of the user
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAllAdsForUser(userId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/users/ads/` + userId,
        };

        return axios.request(options);
    },

    /**
     * Method to get a list of random ads
     *
     * @param pageSize how many ads on the page
     * @param lat latitude of the user
     * @param lng longitude ofthe user
     * @returns {Promise<AxiosResponse<any>>}
     */
    getPageWithRandomAds(pageSize, lat,lng) {
        const options = {
            method: 'POST',
            url: `${url}${port}/api/ads/page/${pageSize}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            },
            data: {"lat": lat, "lng": lng}
    };

        return axios.request(options);
    },

    /**
     * Method for filtering ads when category is not chosen
     *
     * @param filterType can be "distance" or "price"
     * @param upperLimit is the upperlimit of the filterType
     * @param lowestValueFirst is a boolean, set true if you want to sort increasing, and false for decreasing
     * @param lat is the latitude coordinate for the user
     * @param lng is the longitude coordinate for the user
     * @returns {Promise<AxiosResponse<any>>}
     */
    filterAdsForPriceOrDistance(filterType, upperLimit, lowestValueFirst, lat,lng){
        const options = {
            method: 'POST',
            url: `${url}${port}/api/ads/filter`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '
            },
            data: {
                filterType: filterType,
                upperLimit: upperLimit,
                lowestValueFirst: lowestValueFirst,
                lat: lat,
                lng: lng
            }
        };
        return axios.request(options);
    },

    /**
     * Method for filtering ads when category is chosen
     * @param filterType can be "distance" or "price"
     * @param category is the name of the category selected by user
     * @param upperLimit is the upperlimit of the filterType
     * @param lowestValueFirst is a boolean, set true if you want to sort increasing, and false for decreasing
     * @param lat is the latitude coordinate for the user
     * @param lng is the longitude coordinate for the user
     * @returns {Promise<AxiosResponse<any>>}
     */
    filterAdsInCategoryByDistanceOrPrice(filterType, category, upperLimit, lowestValueFirst, lat, lng){
        const options = {
            method: 'POST',
            url: 'http://localhost:8443/api/ads/category/filter',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '
            },
            data: {
                filterType: filterType,
                category: category,
                upperLimit: upperLimit,
                lowestValueFirst: lowestValueFirst,
                lat: lat,
                lng: lng
            }
        };
        return axios.request(options);
    }
}
