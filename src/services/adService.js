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
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        };

        return axios.request(options);
    },
    /**
     * @param adId API call for adding picture have adId in the return, which is what you sends to add picture afterwards
     * @param pictureLink is the link to the picture, example format: 'C:UsersKarolOneDriveDiversePicturesdayEivind_Hellstrom.jpg'
     */
    uploadPictureForAd(adId, pictureLink){
        const form = new FormData();
        form.append("multipartFile", pictureLink);
        form.append("id", adId);

        const options = {
            method: 'POST',
            url: `${url}${port}/api/auth/ads/newPicture`,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: '[form]'
        };
        return axios.request(options);

    },
    getAllUnavailableDatesForAd(adId){
        const options = {
            method: 'POST',
            url: `${url}${port}/api/calender/get`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: { adId : adId}
        };
        return axios.request(options);
    },
    /**
     *
     * @param durationType can be 'HOUR', 'DAY', 'WEEK', 'MONTH'
     * @param categoryId is the id of the subcategory
     */
    postNewAd(
        title,
        description,
        durationType,
        price,
        streetaddress,
        postalCode,
        userId,
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
                duration: 1,
                price: price,
                streetAddress: streetaddress,
                postalCode: postalCode,
                userId: userId,
                categoryId: categoryId,
            },
        };

        return axios.request(options);
    }
};

