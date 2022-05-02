import axios from "axios";
let url = 'http://localhost:'
let port = "8080"

export default {
    /**
     * Method to create a request for a rental
     * @param deadline for cancelling the rental, 24 hours before rent starts
     * @param price
     */
    createRental(dateOfRental, rentFrom, rentTo, deadline, price, lenderId, userId, adId) {
        const options = {
            method: 'POST',
            url: `${url}${port}/rental/create`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            },
            data: {
                dateOfRental: dateOfRental,
                rentFrom: rentFrom,
                rentTo: rentTo,
                deadline: deadline,
                //change to false when chat works TODO
                active: 'true',
                price: price,
                owner: lenderId,
                borrower: userId,
                adId: adId,
                id: 0
            },
        };

        return axios.request(options)
    },
    /**
     * Method to activate a rental when the lender has accepted the request
     */
    activateRental(rentalId) {
        const options = {
            method: 'PUT',
            url: `${url}${port}/rental/` + rentalId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            }
        };

        return axios.request(options);
    },
    deleteRental(rentalId) {
        const options = {
            method: 'DELETE',
            url: `${url}${port}/rental/delete/` + rentalId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            }
        };

        return axios.request(options);
    },

    updateRental(rentalId, dateRentFrom, dateRentTo, deadline, price) {
        const options = {
            method: 'PUT',
            url: `${url}${port}/rental/update/` + rentalId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            },
            data: {rentFrom: dateRentFrom, rentTo: dateRentTo, deadline: deadline, price: price}
        };

        return axios.request(options);
    },

    getRentalById(rentalId) {
        const options = {
            method: 'GET',
            url: `${url}${port}/rental/` + rentalId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            }
        };
        return axios.request(options);
    },

    /**
     * Gets all the items a user have lent, and all items it has rented out
     */
    getHistoryRentalForUser(userId) {
        const options = {
            method: 'GET',
            url: `${url}${port}/rental/s/` + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            }
        };
        return axios.request(options);
    },
}