import { shallowMount } from "@vue/test-utils";
import AdComponent from "@/components/AdComponent";
// import store from "@/store";
import { createStore } from "vuex";

const store = createStore({
    state:{
        loggedIn: true
    },
    getters:{
        loggedIn(state) {
            return state.loggedIn
        }
    }
})

function findByText (wrap, selector, text) {
    return wrap.findAll(selector).filter(n => n.text().match(text));
}

describe("AdComponent.vue", () => {

    it("renders props when passed", () => {
        const id = 1;
        const title = "Motorsag";
        const price = 1000;
        const place = "Trondheim";
        const image = "BoCo.png";
        const wrapper = shallowMount(AdComponent, {
            global:{
                plugins: [store]
            },
            props: {
                id,
                title,
                price,
                place,
                image
            },
        });
        expect(wrapper.text()).toMatch(title);
        expect(wrapper.text()).toMatch(place);
        expect(wrapper.text()).toMatch(price.toString());
    });

    it("Renders 'til annonse' button", () => {
        const id = 1;
        const title = "Motorsag";
        const price = 1000;
        const place = "Trondheim";
        const image = "BoCo.png";
        const wrapper = shallowMount(AdComponent, {
            global:{
                plugins: [store]
            },
            props: {
                id,
                title,
                price,
                place,
                image
            },
        });

        const sendMessageBtn = findByText(wrapper, 'a', "Til annonse").at(0)
        expect(sendMessageBtn.exists()).toBeTruthy()
    });
});
