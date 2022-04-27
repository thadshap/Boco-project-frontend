import axios from "axios";

export default {
  /**
   *Methods for rental
   */

  /**
   * Method to create a request for a rental
   * @param deadline for cancelling the rental, 24 hours before rent starts
   * @param price
   */
  createRental(
    dateOfRental,
    rentFrom,
    rentTo,
    deadline,
    price,
    lenderId,
    userId,
    adId
  ) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/rental/create",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
      data: {
        dateOfRental: dateOfRental,
        rentFrom: rentFrom,
        rentTo: rentTo,
        deadline: deadline,
        //change to false when chat works TODO
        active: "true",
        price: price,
        owner: lenderId,
        borrower: userId,
        ad: adId,
      },
    };

    return axios.request(options);
  },
  /**
   * Method to activate a rental when the lender has accepted the request
   */
  activateRental(rentalId) {
    const options = {
      method: "PUT",
      url: "http://localhost:8080/rental/" + rentalId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    };

    return axios.request(options);
  },
  deleteRental(rentalId) {
    const options = {
      method: "DELETE",
      url: "http://localhost:8080/rental/delete/" + rentalId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    };

    return axios.request(options);
  },

  updateRental(rentalId, dateRentFrom, dateRentTo, deadline, price) {
    const options = {
      method: "PUT",
      url: "http://localhost:8080/rental/update/" + rentalId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
      data: {
        rentFrom: dateRentFrom,
        rentTo: dateRentTo,
        deadline: deadline,
        price: price,
      },
    };

    return axios.request(options);
  },

  getRentalById(rentalId) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/rental/" + rentalId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    };
    return axios.request(options);
  },

  /**
   * Gets all the items a user have lent, and all items it has rented out
   */
  getHistoryRentalForUser(userId) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/rental/s/" + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    };

    return axios.request(options);
  },
  /**
   * Methods for categories
   */

  getAllAdsForCategory(categoryId){
    const options = {method: 'GET', url: 'http://localhost:8080/api/categories/ads/' + categoryId};
    return axios.request(options);
  },

  /**
   *get all categories
   */
  getAllCategories(){
    const options = {method: 'GET', url: 'http://localhost:8080/api/categories'};
    return axios.request(options);
  },

  /**
   *get all categories
   * @param categoryName is the name of the parent category
   */
  getAllSubCategoriesForCategory(categoryName){
    const options = {method: 'GET', url: 'http://localhost:8080/api/categories/' + categoryName};
          return axios.request(options);
  },

  /**
   *Methods for user
   */

  /**
   * Method to update a user
   */
  updateUser(firstName, lastName, email, password, userId) {
    const options = {
      method: "PUT",
      url: "http://localhost:8080/user/" + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    };

    return axios.request(options);
  },

  getUserById(userId) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/user/" + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    };

    return axios.request(options);
  },
  deleteUser(userId) {
    const options = {
      method: "DELETE",
      url: "http://localhost:8080/user/" + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
      data: {},
    };

    return axios.request(options);
  },
  /**
   * Methods for login and registration for user
   */

  /**
   * Method to log in a user
   * @param emailEntered is the email the user entered
   * @param passwordEntered is the password the user entered
   */
  logIn(emailEntered, passwordEntered) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: emailEntered, password: passwordEntered },
    };
    return axios.request(options);
  },

  /**
   * Method to log in a user
   * @param emailEntered is the email the user entered
   * @param passwordEntered is the password the user entered
   */
  logInSocial(name, imgUrl, email, provider) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/auth/login/outside",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        imgUrl: imgUrl,
        email: email,
        provider: provider
      },
    };
    axios
      .request(options)
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  /**
   * Method to register new user
   */
  registerUser(firstName, lastName, email, password, matchingPassword) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/auth/register",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        matchingPassword: matchingPassword,
      },
    };
    return axios.request(options);
  },
  /**
   * method to send email to user where they can change password
   */
  forgotPassword(email) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/auth/forgotPassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: email },
    };

    return axios.request(options);
  },
  /**
   * method to renew password
   * @token the token in the url when the user clicked on the link in email
   */
  renewPassword(password, confPassword, token) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/auth/renewPassword",
      params: { token: token },
      headers: {
        "Content-Type": "application/json",
      },
      data: { password: password, confirmPassword: password },
    };

    return axios.request(options);
  },

  /**
   * Methods for reviews
   */

  /**
   * Method to delete one specific review for an ad
   * @param userId is the id of the user who left the review
   * @param adId is the id of the ad
   */
  deleteReview(userId, adId) {
    const options = {
      method: "DELETE",
      url: "http://localhost:8080/api/delete/review",
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
      url: "http://localhost:8080/api/reviews/" + adId,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
    };

    return axios.request(options);
  },
  /**
   * Method to get a list of all the reviews a user has recieved
   */
  getReviewsByUserId(userId) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/users/ads/reviews/" + userId,
    };

    return axios.request(options);
  },

  /**
   * Methods for ads
   */

  /**
   * Method to get sort a list from lowest to highest price
   * @param listOfAds the ads who need to be sorted
   */
  sortListOfAdsByIncreasingPrice(listOfAds) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/sort/list/price/ascending",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
      data: [{ list: listOfAds }],
    };

    return axios.request(options);
  },
  /**
   * Method to get sort a list from highest to lowest price
   * @param listOfAds the ads who need to be sorted
   */
  sortListByDescendingPrice(listOfAds) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/sort/list/price/descending",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
      data: [
        {
          list: listOfAds,
        },
      ],
    };

    return axios.request(options);
  },

  /**
   * Method to sort a list of Ads from lowest to highest distance
   * @param listOfAds is the list to be sorted
   */
  sortListByAscendingDistance(listOfAds) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/sort/list/distance/ascending",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
      data: [{ list: listOfAds }],
    };

    return axios.request(options);
  },
  /**
   * Method to sort a list of Ads from lowest to highest distance
   * @param listOfAds is the list to be sorted
   */
  sortListByDescendingDistance(listOfAds) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/sort/list/distance/descending",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
      data: [{ list: listOfAds }],
    };

    return axios.request(options);
  },

  /**
   * Method to get a list of ads who in a price range
   */
  getAdsInPriceRange(listOfAds, upperLimit){
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/getListWithinPriceRange',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer '},
      data: {
        list: 'insert array',
        upperLimit: upperLimit,
        lowerLimit: 0
      }
    };
    return axios.request(options);
  },

  /**
   * Method to get a list of ads who in a span of distance from the user
   * @param listOfAds list of ads to sort
   * @param limitUpper upper limit for distance
   */
  getSortedListOfAdsWithinDistance(listOfAds, limitUpper) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/filterByDistance",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
      data: { list: listOfAds, upperLimit: limitUpper },
    };

    return axios.request(options);
  },
  /**
   * Method to get a list of ads who are nearby the user
   */
  getAllAdsForUser(userId) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/users/ads/" + userId,
    };

    return axios.request(options);
  },
  //Available
  getAdsByUserId() {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/ads/available/1",
    };

    return axios.request(options);
  },

  /**
   * Method to get a list of ads who have a specific postal code
   * @param postalCode is the specific postal code who will be filtered by
   */
  getAdsByPostalCode(postalCode) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/ads/postal/" + postalCode,
    };

    return axios.request(options);
  },
  getAllAds() {
    const options = { method: "GET", url: "http://localhost:8080/api/ads" };

    return axios.request(options);
  },

  getAllAvailableAds() {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/ads/available/true",
      headers: { "Content-Type": "application/json" },
    };

    return axios.request(options);
  },

  /**
   * Method to get a list of ads who are nearby the user
   * @param latitude is the latitude coordinate for the current user
   * @param longitude is the longitude coordinate for the current user
   */
  getAllNearbyAds(latitude, longitude) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/ads/nearby",
      headers: { "Content-Type": "application/json" },
      data: { lat: latitude, lng: longitude },
    };

    return axios.request(options);
  },
  /**
   * Method to get a list of random ads
   * @param pageSize how many ads on the page
   */
  getPageWithRandomAds(pageSize) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/ads/page/" + pageSize,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
    };

    return axios.request(options);
  },

  /**
   * Method for returning a list of ads where the ads header
   *      or category will be filtered by the searchString
   * @param searchString is the string who ads will be filtered by
   */
  getAdsBySearch(searchString) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/search/" + searchString,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
    };

    return axios.request(options);
  },
  getAdsByRentalType() {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/ads/rental/true",
    };

    return axios.request(options);
  },

  /**
   * Methods for ad
   */

  /**
   * Method to delete an ad
   * @param adId is the id for the ad to be deleted
   */
  deleteAd(adId) {
    const options = {
      method: "DELETE",
      url: "http://localhost:8080/api/ads/" + adId,
      headers: { Authorization: "Bearer" },
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
      url: "http://localhost:8080/api/ads/" + adId,
      headers: { "Content-Type": "application/json", Authorization: "Bearer" },
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
      url: "http://localhost:8080/api/ads/" + adId,
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
      url: 'http://localhost:8080/api/ads/newPicture',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
        Authorization: 'Bearer '
      },
      data: '[form]'
    };
    return axios.request(options);

  },
  /**
   *
   * @param durationType can be 'HOUR', 'DAY', 'WEEK', 'MONTH'
   * @param categoryId is the id of the subcategory
   */
  postNewAdd(
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
      url: "http://localhost:8080/api/ads/newAd",
      headers: { "Content-Type": "application/json" },
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
  },
};
