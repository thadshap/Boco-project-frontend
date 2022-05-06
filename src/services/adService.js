import axios from "axios";
let url = 'https://localhost:'
let port = "8443"

export default {

    /**
     * Gets an ad by id
     *
     * @param adId id for the ad to get
     * @returns {Promise<AxiosResponse<any>>}
     */
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
     * Gets the first picture for an ad from the database
     *
     * @param adId id of the ad
     * @returns {Promise<AxiosResponse<any>>}
     */
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

    /**
     * Gets all pictures for an ad
     *
     * @param adId id of the ad
     * @returns {Promise<AxiosResponse<any>>}
     */
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

    /**
     * Gets all unavailable dates for an ad
     *
     * @param adId id of the ad
     * @returns {Promise<AxiosResponse<any>>}
     */
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
     *Posts a new ad without pictures
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
        categoryId,
        city
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
                city: city
            },
        };

        return axios.request(options);
    },

    /**
     * @param adId API call for adding picture have adId in the return, which is what you sends to add picture afterwards
     * @param pictures {Array<Object>} of pictures to upload
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
    }
};

