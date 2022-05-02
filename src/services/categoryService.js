import axios from "axios";
<<<<<<< HEAD
let url = 'http://localhost:'
=======
let url = 'https://localhost:'
>>>>>>> 5123624083864fa565d469c36ef81c45bbaa90df
let port = "8443"

export default {
    getAllAdsForCategory(categoryId){
        const options = {method: 'GET', url: `${url}${port}/api/categories/ads/` + categoryId};
        return axios.request(options);
    },

    /**
     *get all categories
     */
    getAllCategories(){
        const options = {method: 'GET', url: `${url}${port}/api/categories`};
        return axios.request(options);
    },

    /**
     *get all categories
     * @param categoryName is the name of the parent category
     */
    getAllSubCategoriesForCategory(categoryName){
        const options = {method: 'GET', url: `${url}${port}/api/categories/` + categoryName};
        return axios.request(options);
    },
}