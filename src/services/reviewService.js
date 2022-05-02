import axios from "axios";
let url = 'http://localhost:'
let port = "8443"

export default {
    /**
     * Method to delete one specific review for an ad
     * @param userId is the id of the user who left the review
     * @param adId is the id of the ad
     */
    deleteReview(userId, adId) {
        const options = {
            method: "DELETE",
            url: `${url}${port}/api/delete/review`,
            headers: { "Content-Type": "application/json", Authorization: "Bearer " },
            data: { rating: "", description: "", userId: userId, adId: adId },
        };

        return axios.request(options);
    },

    /**
     * Method to get all reviews posted for a specific add
     * @param adId is the id of the ad
     */
    getAllReviewsForAd(adId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/reviews/` + adId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        };

        return axios.request(options);
    },
    /**
     * Method to get a list of all the reviews a user has recieved
     */
    getReviewsByUserId(userId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/users/ads/reviews/` + userId,
        };

        return axios.request(options);
    },
}