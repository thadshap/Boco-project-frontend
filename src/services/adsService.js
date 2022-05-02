import axios from "axios";
let url = 'http://localhost:'
let port = "8443"

export default {
    /**
     * Method to get sort a list from lowest to highest price
     * @param listOfAds the ads who need to be sorted
     */
    sortListOfAdsByIncreasingPrice(listOfAds) {
        const options = {
            method: "POST",
            url: `${url}${port}/api/sort/list/price/ascending`,
            headers: {
                "Content-Type": "application/json"
            },
            data: [{ list: listOfAds }],
        };

        return axios.request(options);
    },
    /**
     * Method to get sort a list from highest to lowest price
     * @param listOfAds the ads who need to be sorted
     */
    sortListByDescendingPrice(listOfAds) {
        const options = {
            method: "POST",
            url: `${url}${port}/api/sort/list/price/descending`,
            headers: {
                "Content-Type": "application/json"
            },
            data: [
                {
                    list: listOfAds,
                },
            ],
        };

        return axios.request(options);
    },

    /**
     * Method to sort a list of Ads from lowest to highest distance
     * @param listOfAds is the list to be sorted
     */
    sortListByAscendingDistance(listOfAds) {
        const options = {
            method: "POST",
            url: `${url}${port}/api/sort/list/distance/ascending`,
            headers: {
                "Content-Type": "application/json"
            },
            data: [{ list: listOfAds }],
        };

        return axios.request(options);
    },
    /**
     * Method to sort a list of Ads from lowest to highest distance
     * @param listOfAds is the list to be sorted
     */
    sortListByDescendingDistance(listOfAds) {
        const options = {
            method: "POST",
            url: `${url}${port}/api/sort/list/distance/descending`,
            headers: {
                "Content-Type": "application/json",
            },
            data: [{ list: listOfAds }],
        };

        return axios.request(options);
    },

    /**
     * Method to get a list of ads who in a price range
     */
    getAdsInPriceRange(listOfAds, upperLimit){
        const options = {
            method: 'POST',
            url: `${url}${port}/api/getListWithinPriceRange`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                list: listOfAds,
                upperLimit: upperLimit,
                lowerLimit: 0
            }
        };
        return axios.request(options);
    },

    /**
     * Method to get a list of ads who in a span of distance from the user
     * @param listOfAds list of ads to sort
     * @param limitUpper upper limit for distance
     */
    getSortedListOfAdsWithinDistance(listOfAds, limitUpper) {
        const options = {
            method: "POST",
            url: `${url}${port}/api/filterByDistance`,
            headers: {
                "Content-Type": "application/json"
            },
            data: { list: listOfAds, upperLimit: limitUpper },
        };

        return axios.request(options);
    },
    /**
     * Method to get a list of ads who are nearby the user
     */
    getAllAdsForUser(userId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/users/ads/` + userId,
        };

        return axios.request(options);
    },
    //Available
    getAllAvailableAdsByUserId(userId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/ads/available/`+userId,
        };

        return axios.request(options);
    },

    /**
     * Method to get a list of ads who have a specific postal code
     * @param postalCode is the specific postal code who will be filtered by
     */
    getAdsByPostalCode(postalCode) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/ads/postal/` + postalCode,
        };

        return axios.request(options);
    },
    getAllAds() {
        const options = { method: "GET", url: `${url}${port}/api/ads` };

        return axios.request(options);
    },

    getAllAvailableAds() {
        const options = {
            method: "POST",
            url: `${url}${port}/api/ads/available/true`,
            headers: { "Content-Type": "application/json" },
        };

        return axios.request(options);
    },

    /**
     * Method to get a list of ads who are nearby the user
     * @param latitude is the latitude coordinate for the current user
     * @param longitude is the longitude coordinate for the current user
     */
    getAllNearbyAds(latitude, longitude) {
        const options = {
            method: "POST",
            url: `${url}${port}/api/ads/nearby`,
            headers: { "Content-Type": "application/json" },
            data: { lat: latitude, lng: longitude },
        };

        return axios.request(options);
    },
    /**
     * Method to get a list of random ads
     * @param pageSize how many ads on the page
     */
    getPageWithRandomAds(pageSize) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/ads/page/` + pageSize,
            headers: {
                "Content-Type": "application/json"
            },
        };

        return axios.request(options);
    },
    /**
     * Method for returning a list of ads where the ads header
     *      or category will be filtered by the searchString
     * @param searchString is the string who ads will be filtered by
     */
    getAdsBySearch(searchString) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/search/` + searchString,
            headers: {
                "Content-Type": "application/json"
            },
        };

        return axios.request(options);
    },
    getAdsByRentalType(){
        const options = {
            method: 'GET',
            url: `${url}${port}/api/ads/rental/true`
        };

        return axios.request(options);
    },
}
