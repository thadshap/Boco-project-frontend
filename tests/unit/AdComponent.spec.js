import {mount, shallowMount} from "@vue/test-utils";
import AdComponent from "@/components/AdComponent";
import {createStore} from "vuex";
import DetailedAd from "@/views/DetailedAd";

const store = createStore({
    state:{
        currentAd: {}
    },
    mutations: {
        SET_CURRENT_AD(state, currentAd) {
            state.currentAd = currentAd
        },
    },
    actions: {
        setCurrentAd({ commit }, currentAd) {
            commit("SET_CURRENT_AD", currentAd)
        },
    },
    getters:{
        currentAd(state) {
            return state.currentAd
        }
    }
})

jest.spyOn(AdComponent.methods, "goToDetailedView")
    .mockImplementation(() => {
        AdComponent.data().disable.push([new Date()])
    })

describe("AdComponent.vue", () => {
    it("renders props when passed", () => {
        const id = 1;
        const title = "Motorsag";
        const price = 1000;
        const place = "Trondheim";
        const image = "BoCo.png";
        const userId = 1
        const wrapper = shallowMount(AdComponent, {
            global:{ plugins: [store]},
            props: { id,title,price,place,image,userId },
        });

        expect(wrapper.text()).toContain(`${title}${price} kr   Til annonse`);
    });

    it("Renders image when passed", () => {
        const id = 1;
        const title = "Motorsag";
        const price = 1000;
        const place = "Trondheim";
        const image = "BoCo.png";
        const userId = 1
        const wrapper = shallowMount(AdComponent, {
            global:{ plugins: [store]},
            props: { id,title,price,place,image,userId },
        });
        expect(wrapper.find("img").attributes("src")).toBe(`${image}`)
    });

    it("test that clicking on 'Send melding' routes to detailed ad", async () => {

        const id = 1;
        const title = "Motorsag";
        const price = 1000;
        const place = "Trondheim";
        const image = "BoCo.png";
        const userId = 1

        const mockRoute = {}

        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = mount(AdComponent, {
            props: { id,title,price,place,image,userId },
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })
        let btn = wrapper.findAll('a').filter(a => a.text() === "Til annonse")[0]

        await btn.trigger("click")

        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith({"name": "Ad"})
    })
});
