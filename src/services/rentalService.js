import axios from "axios";
let url = 'https://localhost:'
let port = "8443"

export default {

    /**
     * Method to create a request for a rental
     *
     * @param deadline for cancelling the rental, 24 hours before rent starts
     * @param price
     */
    createRental(dateOfRental, rentFrom, rentTo, deadline, price, lenderEmail, userEmail, adId) {
        const options = {
            method: 'POST',
            url: `${url}${port}/rental/create`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                dateOfRental: dateOfRental,
                rentFrom: rentFrom,
                rentTo: rentTo,
                deadline: deadline,
                active: false,
                price: price,
                isReviewed: false,
                owner: lenderEmail,
                borrower: userEmail,
                title: "title",
                adId: adId,
                id: 0
            },
        };

        return axios.request(options)
    },

    /**
     * Method to activate a rental when the lender has accepted the request
     *
     * @param rentalId id of the rental
     * @returns {Promise<AxiosResponse<any>>}
     */
    approveRental(rentalId) {
        const options = {
            method: 'PATCH',
            url: `${url}${port}/rental/activate/` + rentalId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        };

        return axios.request(options);
    },

    /**
     * Method to delete a rental
     *
     * @param rentalId
     * @param rating
     * @param review
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteRental(rentalId, rating, review){
        const options = {
            method: 'DELETE',
            url: 'http://localhost:8443/rental/delete/' + rentalId,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            data: {review: rating, rating: review}
        };

        return axios.request(options);
    },

    /**
     * Method to decline a rental
     *
     * @param rentalId
     * @returns {Promise<AxiosResponse<any>>}
     */
    declineRental(rentalId) {
        const options = {
            method: "DELETE",
            url: `${url}${port}/rental/decline/` + rentalId,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        return axios.request(options);
    },

    /**
     * Gets a rental by its id
     *
     * @param rentalId
     * @returns {Promise<AxiosResponse<any>>}
     */
    getRentalById(rentalId) {
        const options = {
            method: 'GET',
            url: `${url}${port}/rental/` + rentalId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        };
        return axios.request(options);
    },

    /**
     * Gets all the items a user have lent, and all items it has rented out
     *
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
    getHistoryRentalForUser(userId) {
        const options = {
            method: 'GET',
            url: `${url}${port}/rental/s/` + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        };
        return axios.request(options);
    },
}
