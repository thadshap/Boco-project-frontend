import axios from "axios";
let url = "http://localhost:";
let port = "8443";

export default {
  getAllAdsForCategory(categoryId) {
    const options = {
      method: "GET",
      url: `${url}${port}/api/categories/ads/${categoryId}`,
    };
    return axios.request(options);
  },

  /**
   *get all categories
   */
  getAllCategories() {
    const options = {
      method: "GET",
      url: `${url}${port}/api/categories`,
    };
    return axios.request(options);
  },

  /**
   *get parent categories
   */
  getAllParentCategories() {
    const options = {
      method: "GET",
      url: `${url}${port}/api/categories/parent`,
    };
    return axios.request(options);
  },

  /**
   *get all categories
   * @param categoryName is the name of the parent category
   */
  getAllSubCategoriesForCategory(categoryName) {
    const options = {
      method: "GET",
      url: `${url}${port}/api/categories/${categoryName}`,
    };
    return axios.request(options);
  },

    /**
     * Get all ads for a category and its subcategories, and its subcategories etc
     * @param categoryName name of the upmost category
     * @returns {Promise<AxiosResponse<any>>}
     */
  getAllAdsForCategoryAndSubCategories(categoryName) {
    const options = {
      method: "GET",
      url: `${url}${port}/api/categoriesRecursive/${categoryName}`,
    };
    return axios.request(options);
  },
};
