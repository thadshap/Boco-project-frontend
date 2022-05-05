import axios from "axios";
let url = 'https://localhost:'
let port = "8443"

export default {
    /**
     * Method to delete an ad
     * @param adId is the id for the ad to be deleted
     */
    deleteAd(adId) {
        const options = {
            method: "DELETE",
            url: `${url}${port}/api/auth/ads/` + adId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        };

        return axios.request(options);
    },
    /**
     * Method to update an ad, can change one to all attributes
     */
    updateAd(
        adId,
        newTitle,
        newPrice,
        newDescription,
        newDurationType,
        newCategoryId,
        newStreetAdress,
        newPostalCode
    ) {
        const options = {
            method: "PUT",
            url: `${url}${port}/api/auth/ads/` + adId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                title: newTitle,
                price: newPrice,
                description: newDescription,
                durationType: newDurationType,
                categoryId: newCategoryId,
                streetAddress: newStreetAdress,
                postalCode: newPostalCode
            },
        };

        return axios.request(options);
    },
    getAdById(adId) {
        const options = {
            method: "GET",
            url: `${url}${port}/api/ads/` + adId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            },
        };

        return axios.request(options);
    },
    /**
     * @param adId API call for adding picture have adId in the return, which is what you sends to add picture afterwards
     * @param pictureLink is the link to the picture, example format: 'C:UsersKarolOneDriveDiversePicturesdayEivind_Hellstrom.jpg'
     */
    uploadPicturesForAd(adId, pictures){
        let userId = localStorage.getItem("userId");

        const options = {
            method: 'POST',
            url: `${url}${port}/api/auth/ads/newPicture/${userId}/${adId}`,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: pictures
        };
        return axios.request(options);
    },
    getPictureForAd(adId) {
        const options = {
            method: 'GET',
            url: `${url}${port}/api/ads/picture/${adId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            }
        };
        return axios.request(options);
    },
    getPicturesForAd(adId) {
        const options = {
            method: 'GET',
            url: `${url}${port}/api/ads/pictures/${adId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            }
        };
        return axios.request(options);
    },
    getAllUnavailableDatesForAd(adId){
        const options = {
            method: 'POST',
            url: `${url}${port}/api/calendar/get`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: { adId : adId}
        };
        return axios.request(options);
    },
    /**
     *Posts a new ad
     *
     * @param title title of the ad
     * @param description description of the ad
     * @param durationType can be 'HOUR', 'DAY', 'WEEK', 'MONTH'
     * @param price price of the ad
     * @param streetaddress address of the ad
     * @param postalCode postal code of the ad
     * @param categoryId is the id of the subcategory
     */
    postNewAd(
        title,
        description,
        durationType,
        price,
        streetaddress,
        postalCode,
        categoryId
    ) {
        const options = {
            method: "POST",
            url: `${url}${port}/api/auth/ads/newAd`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                title: title,
                description: description,
                rental: true,
                durationType: durationType,
                price: price,
                streetAddress: streetaddress,
                postalCode: postalCode,
                userId: localStorage.getItem("userId"),
                categoryId: categoryId,
            },
        };

        return axios.request(options);
    }
};

