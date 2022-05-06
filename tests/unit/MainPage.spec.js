import { mount, shallowMount } from "@vue/test-utils";
import {createStore} from "vuex"
import MainPage from "@/views/MainPage";
import UserSettings from "@/views/UserSettings";


const store = createStore({
  state:{
    currentAd:{
      id:1
    }
  },
  getters:{
    getMainCategories(state) {
      return state.mainCategories
    }
  }
})
jest.spyOn(MainPage.methods, "displayAds")
    .mockImplementation(() => {
    })
jest.spyOn(MainPage.methods, "getAllCategories")
    .mockImplementation(() => {
    })

const ads = [
  {
    "id": 1,
    "price": 200,
    "title": "New pants",
    "description": "Renting out a pair of pants in size 36",
    "distance": 40
  },
  {
    "id": 4,
    "price": 100,
    "title": "New instrument",
    "description": "Renting out an instrument",
    "distance": 20
  },
  {
    "id": 2,
    "price": 150,
    "title": "New bike",
    "description": "Renting out a bike",
    "distance": 30
  }
]

describe("DetailedAd", () => {

  it("test that sorting price from lowest to highest works",  async() => {
    const wrapper = mount(MainPage, {
      data(){
        return{
          cachedAds: ads,
          sortedAds: [],
          showMenuBarSorting: true
        }
      },
      global:{
        plugins:[store]
      }
    });
    const adsSorted = [
      {
        "id": 4,
        "price": 100,
        "title": "New instrument",
        "description": "Renting out an instrument",
        "distance": 20
      },
      {
        "id": 2,
        "price": 150,
        "title": "New bike",
        "description": "Renting out a bike",
        "distance": 30
      },
      {
        "id": 1,
        "price": 200,
        "title": "New pants",
        "description": "Renting out a pair of pants in size 36",
        "distance": 40
      }
    ]
    await wrapper.setData({cachedAds: ads})
    await wrapper.find('[id="lav-hoy"]').trigger("click");
    expect(wrapper.vm.sortedAds).toStrictEqual(adsSorted);
  });
  it("test that sorting price from highest to lowest works",  async() => {
    const wrapper = mount(MainPage, {
      data(){
        return{
          cachedAds: ads,
          sortedAds: [],
          showMenuBarSorting: true
        }
      },
      global:{
        plugins:[store]
      }
    });
    const adsSorted = [
      {
        "id": 1,
        "price": 200,
        "title": "New pants",
        "description": "Renting out a pair of pants in size 36",
        "distance": 40
      },
      {
        "id": 2,
        "price": 150,
        "title": "New bike",
        "description": "Renting out a bike",
        "distance": 30
      },
      {
        "id": 4,
        "price": 100,
        "title": "New instrument",
        "description": "Renting out an instrument",
        "distance": 20
      }
    ]
    await wrapper.setData({cachedAds: ads})
    await wrapper.find('[id="hoy-lav"]').trigger("click");
    expect(wrapper.vm.sortedAds).toStrictEqual(adsSorted);
  });
  it("test that sorting from newest to eldest works",  async() => {
    const wrapper = mount(MainPage, {
      data(){
        return{
          cachedAds: ads,
          sortedAds: [],
          showMenuBarSorting: true
        }
      },
      global:{
        plugins:[store]
      }
    });
    const adsSorted = [
      {
        "id": 4,
        "price": 100,
        "title": "New instrument",
        "description": "Renting out an instrument",
        "distance": 20
      },
      {
        "id": 2,
        "price": 150,
        "title": "New bike",
        "description": "Renting out a bike",
        "distance": 30
      },
      {
        "id": 1,
        "price": 200,
        "title": "New pants",
        "description": "Renting out a pair of pants in size 36",
        "distance": 40
      }
    ]
    await wrapper.setData({cachedAds: ads})
    await wrapper.find('[id="ny-eld"]').trigger("click");
    expect(wrapper.vm.sortedAds).toStrictEqual(adsSorted);
  });
  it("test that sorting from eldest to newest works",  async() => {
    const wrapper = mount(MainPage, {
      data(){
        return{
          cachedAds: ads,
          sortedAds: [],
          showMenuBarSorting: true
        }
      },
      global:{
        plugins:[store]
      }
    });
    const adsSorted = [
      {
        "id": 1,
        "price": 200,
        "title": "New pants",
        "description": "Renting out a pair of pants in size 36",
        "distance": 40
      },
      {
        "id": 2,
        "price": 150,
        "title": "New bike",
        "description": "Renting out a bike",
        "distance": 30
      },
      {
        "id": 4,
        "price": 100,
        "title": "New instrument",
        "description": "Renting out an instrument",
        "distance": 20
      }
    ]
    await wrapper.setData({cachedAds: ads})
    await wrapper.find('[id="eld-ny"]').trigger("click");
    expect(wrapper.vm.sortedAds).toStrictEqual(adsSorted);
  });
  it("test that pressing filtering button will show options", async () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    await wrapper.find('[id="filter"]').trigger("click");
    expect(wrapper.find('[id="filterItems"]').exists()).toBe(true);
  });
  it("test that pressing sorting button will show options", async () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    await wrapper.find('[id="sort"]').trigger("click");
    expect(wrapper.find('[id="sortItems"]').exists()).toBe(true);
  });
  it("test that filtering distance changes header", async () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    await wrapper.find('[id="filter"]').trigger("click");
    await wrapper.find('[id="distanceValue"]').setValue(200);
    await wrapper.find('[id="distanceRange"]').trigger("click");

    expect(wrapper.vm.titleHeader).toStrictEqual("Gjenstander for utlån filtrert etter avstander");
  });
  it("test that filtering price changes header ", async () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    await wrapper.find('[id="filter"]').trigger("click");
    await wrapper.find('[id="priceValue"]').setValue(200);
    await wrapper.find('[id="pricerange"]').trigger("click");

    expect(wrapper.vm.titleHeader).toStrictEqual("Gjenstander for utlån filtrert etter pris");
  });
  it("test placeholder to input field", () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('input[htmlPlaceholder="Søk"]').exists());
  });
  it('test id to input field', () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('input[id="priceValue"]').exists());
  });
  it('test id to input field', () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('input[id="pricerange"]').exists());
  });
  it('test id to input field', () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('input[id="distanceValue"]').exists());
  });
  it('test id to input field', () => {
    const wrapper = mount(MainPage, {
      global:{
        plugins:[store]
      }
    });
    expect(wrapper.find('input[id="distanceRange"]').exists());
  });
})


