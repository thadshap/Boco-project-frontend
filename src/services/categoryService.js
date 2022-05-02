import axios from "axios";
let url = 'https://localhost:'
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