import axios from "axios";
let url = "https://localhost:";
let port = "8443";

export default {

  /**
   * Get all categories
   */
  getAllCategories() {
    const options = {
      method: "GET",
      url: `${url}${port}/api/categories/level`,
    };
    return axios.request(options);
  },

  /**
   * Get parent categories
   */
  getAllParentCategories() {
    const options = {
      method: "GET",
      url: `${url}${port}/api/categories/parent`,
    };
    return axios.request(options);
  },

  /**
   * Get all ads for a category and its subcategories, and its subcategories etc
   *
   * @param categoryName name of the upmost category
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAllAdsForCategoryAndSubCategories(categoryName, geoLoc) {
    const options = {
      method: "POST",
      url: `${url}${port}/api/categoriesRecursive/${categoryName}`,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        lat: geoLoc.lat,
        lng: geoLoc.lng
      }
    };
    return axios.request(options);
  },
};
