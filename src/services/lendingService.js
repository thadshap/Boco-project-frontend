import axios from "axios";

export default {
    /**
     *Methods for rental
     */

    /**
     *
     * @param deadline for cancelling the rental, 24 hours before rent starts
     * @param price
     */
    createRental(dateOfRental, rentFrom, rentTo, deadline, price, lenderId, userId, adId){
        const options = {
            method: 'POST',
            url: 'http://localhost:8080/rental/create',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            },
            data: {
                dateOfRental: dateOfRental,
                rentFrom: rentFrom,
                rentTo: rentTo,
                deadline: deadline,
                active: 'false',
                price: price,
                owner: lenderId,
                borrower: userId,
                ad: adId
            }
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

    },
    /**
     *Methods for user
     */

    /**
     * Method to update a user
     */
    updateUser(firstName, lastName, email, password){
        const options = {
            method: 'PUT',
            url: 'http://localhost:8080/user/{userId}',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

    },

    getUserById(userId){
        const options = {
            method: 'GET',
            url: 'http://localhost:8080/user/' + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            },
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });
    },
    deleteUser(userId){
        const options = {
            method: 'DELETE',
            url: 'http://localhost:8080/user/' + userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            },
            data: {}
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

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
    axios
      .request(options)
      .then(function (response) {
        localStorage.setItem("token", response.data);
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
    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
    /**
     * method to send email to user where they can change password
     */
    forgotPassword(email){
        const options = {
            method: 'POST',
            url: 'http://localhost:8080/auth/forgotPassword',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {email: email}
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

    },
    /**
     * method to renew password
     * @token the token in the url when the user clicked on the link in email
     */
    renewPassword(password, confPassword, token){
        const options = {
            method: 'POST',
            url: 'http://localhost:8080/auth/renewPassword',
            params: {token: token},
            headers: {
                'Content-Type': 'application/json'
            },
            data: {password: password, confirmPassword: password}
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

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
      data: { rating: "", description: "", user_id: userId, ad_id: adId },
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
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

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  /**
   * Method to get a list of all the reviews a user has recieved
   */
  getReviewsByUserId(userId) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/users/ads/reviews/" + userId,
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  /**
   * Methods for ads
   */

    /**
     * Method to get a list of ads who are nearby the user
     * @param latitude is the latitude coordinate for the current user
     * @param longitude is the longitude coordinate for the current user
     */
  getAllAdsForUser(userId){
        const options = {method: 'GET', url: 'http://localhost:8080/api/users/ads/' + userId};

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

    },
    //Available
    getAdsByUserId(){
        const options = {method: 'GET', url: 'http://localhost:8080/api/ads/available/1'};

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });
    },

    /**
     * Method to get a list of ads who have a specific postal code
     * @param postalCode is the specific postal code who will be filtered by
     */
    getAdsByPostalCode(postalCode){
        const options = {method: 'GET', url: 'http://localhost:8080/api/ads/postal/' + postalCode};

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

    },
    getAllAds(){
        const options = {method: 'GET', url: 'http://localhost:8080/api/ads'};

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });
    },

    getAllAvailableAds(){
        const options = {
            method: 'POST',
            url: 'http://localhost:8080/api/ads/available/true',
            headers: {'Content-Type': 'application/json'},
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });
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

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
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

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  /**
   * Method for returning a list of ads sorted in descending order by sortByAttribute
   * @param sortByAttribute can be any of the attributes in ad object.
   *          Example 'price', 'postal_code'
   * @param pageSize how many ads on the page
   */
  sortAdsByDescending(sortByAttribute, pageSize) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/ads/sort/descending",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
      data: { pageSize: pageSize, sortBy: sortByAttribute },
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  /**
   * Method for returning a list of ads sorted in ascending order by sortByAttribute
   * @param sortByAttribute can be any of the attributes in ad object.
   *          Example 'price', 'postal_code'
   * @param pageSize how many ads on the page
   */
  sortAdsByAscending(sortByAttribute, pageSize) {
    const options = {
      method: "POST",
      url: "http://localhost:8080/api/ads/sort/ascending",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
      data: { pageSize: pageSize, sortBy: sortByAttribute },
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  /**
   * Method for returning a list of ads sorted from newest to oldest
   * @param pageSize how many ads on the page
   */
  sortAdsFromNewestToOldest(pageSize) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/ads/newest/" + pageSize,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  /**
   * Method for returning a list of ads sorted from oldest to newest
   * @param pageSize how many ads on the page
   */
  sortAdsFromOldestToNewest(pageSize) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/ads/oldest/" + pageSize,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " },
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
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

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
    getAdsByRentalType(){
        const options = {method: 'GET', url: 'http://localhost:8080/api/ads/rental/true'};

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });
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
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
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
    newPostalCode,
    newPicture
  ) {
    const options = {
      method: "PUT",
      url: "http://localhost:8080/api/ads/" + adId,
      headers: { "Content-Type": "application/json" },
      data: {
        title: newTitle,
        price: newPrice,
        description: newDescription,
        duration_type: newDurationType,
        category_id: newCategoryId,
        street_address: newStreetAdress,
        postal_code: newPostalCode,
        picture: newPicture,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
    getAdById(adId){
        const options = {method: 'GET', url: 'http://localhost:8080/api/ads/' + adId};

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });
    },
    /**
     *
     * @param durationType can be 'HOUR', 'DAY', 'WEEK', 'MONTH'
     * @param categoryId is the id of the subcategory
     */
    postNewAdd(title, description, durationType, price, streetaddress, postalCode, userId, categoryId){
        const options = {
            method: 'POST',
            url: 'http://localhost:8080/api/ads/newAd',
            headers: {'Content-Type': 'application/json'},
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
                categoryId: categoryId
            }
        };

        axios.request(options).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });

    },
};
