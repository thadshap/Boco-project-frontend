import {mount} from "@vue/test-utils";
import {createStore} from "vuex"
import DetailedAd from "@/views/DetailedAd";


const ad = {
  "rental": true,
  "rentedOut": false,
  "duration": 2,
  "durationType": "MONTH",
  "categoryId": 5,
  "price": 100,
  "streetAddress": "Project Road 4",
  "postalCode": 7200,
  "city": "Trondheim",
  "title": "New pants",
  "description": "Renting out a pair of pants in size 36",
  "distance": 0.0,
  "lat": 0.0,
  "lng": 0.0,
  "adId": 1,
  "userId": 1,
  "sizeOfPage": 0,
  "pictures": []
}
const lender = {
  "id": 1,
  "firstName": "Anders",
  "lastName": "Tellefsen",
  "email": "andetel@stud.ntnu.no",
  "password": "$2a$10$DhoTfYl7w7GwR8wDID2V9eRa3vrT81cLanYPyEcqjR4HtXHRu6owe",
  "role": null,
  "verified": false,
  "rating": 0.0
}
const reviews = {
  "rating": 9,
  "description": "veldig bra anbefaler dette produktet!",
  "userId": 3,
  "adId": 1
}
const pictures = {
  "pic": "dog",
  "type": "jpg",
}


jest.spyOn(DetailedAd.methods, "getCurrentAd")
    .mockImplementation(() => {
      DetailedAd.data().ad = ad
    })

jest.spyOn(DetailedAd.methods, "setLender")
    .mockImplementation(() => {
      DetailedAd.data().lender = lender
    })
jest.spyOn(DetailedAd.methods, "getReviews")
    .mockImplementation(() => {
      DetailedAd.data().reviews.push(reviews)
    })
jest.spyOn(DetailedAd.methods, "getAdPictures")
    .mockImplementation(() => {
      DetailedAd.data().pictures.push(pictures)
    })
jest.spyOn(DetailedAd.methods, "checkLoggedIn")
    .mockImplementation(() => {
      DetailedAd.data().userLoggedIn = true
    })
jest.spyOn(DetailedAd.methods, "getUnavailableDates")
    .mockImplementation(() => {
      DetailedAd.data().disable.push([new Date()])
    })


const store = createStore({
  state:{
    currentAd:{
      id:1
    }
  },
  getters:{
    currentAd(state) {
      return state.currentAd
    }
  }
})

describe("DetailedAd", () => {

  it("test that request lend shows calender-pick and requestbutton who is disabled",  async() => {
    const wrapper = mount(DetailedAd,{
      global:{
        plugins:[store]
      }
    });

    await wrapper.setData({userLoggedIn : true})
    await wrapper.find('[id="makeRequest"]').trigger("click");
    expect(wrapper.find('[id="makeRequest"]').exists()).toBe(true)
    expect(wrapper.find('[id="time"]').exists()).toBe(true);
    expect(wrapper.find('[id="sendRequest"]').element.disabled).toBe(true);

    await wrapper.setData({date : '27.06.2021'});
    expect(wrapper.find("#sendRequest")).toBe(false);
  });

  it("test that input date will enable button", async () => {
    const wrapper = mount(DetailedAd,{
      global:{
        plugins:[store]
      }
    });
    await wrapper.setData({userLoggedIn : true})
    await wrapper.find('[id="makeRequest"]').trigger("click");
    await wrapper.setData({date : '27.06.2021'});
    expect(wrapper.find('[id="sendRequest"]')).toBe(false);
  });

  it("test that dropdown arrow show earlier reviews", async () => {

    const wrapper = mount(DetailedAd,{
      global:{
        plugins:[store]
      }
    });
    await wrapper.setData({reviews : [
        { name : 'per persen', rating : '5/10', message : 'Veldig fin, litt upraktisk, men ellers kjempe fin jeg liker veldig veldig godt'},
        { name : 'per torvaldsen', rating : '7/10', message : 'Veldig fin altså'}]});
    await wrapper.find('[class="material-icons"]').trigger("click");
    expect(wrapper.findAll('[class="earlierReviews"]').length).toEqual(2);
  });

  it("test that clicking on lender name routes to userProfile", async () => {

    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = mount(DetailedAd, {
      props: {
        isAuthenticated: true
      },
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })
    await wrapper.find('[id="lenderName"]').trigger("click");

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({"name": "UserProfile"})

  })
});


