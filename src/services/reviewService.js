import axios from "axios";
let url = 'https://localhost:'
let port = "8443"

export default {

    /**
     * Method to get all reviews posted for a specific add
     *
     * @param adId is the id of the ad
     */
    getAllReviewsForAd(adId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/reviews/` + adId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            },
        };

        return axios.request(options);
    },

    /**
     * Method to get a list of all the reviews a user has recieved
     *
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
    getReviewsByUserId(userId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/users/ads/reviews/` + userId,
        };

        return axios.request(options);
    },
}
