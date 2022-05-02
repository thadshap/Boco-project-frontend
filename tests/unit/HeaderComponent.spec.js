import { mount } from "@vue/test-utils";
import HeaderComponent from "@/components/HeaderComponent";
import router from "@/router";
import {createStore} from "vuex";

const store = createStore({
    state:{
        isLoggedIn:true
    },
    getters: {
        loggedIn(state) {
            return state.isLoggedIn;
        },
    }
})


describe("HeaderComponent.vue", () => {
    it("renders BorrowCommunity when passed", () => {
        const wrapper = mount(HeaderComponent, {
            global:{
                plugins:[router,store]
            }
        });
        expect(wrapper.text()).toMatch("BorrowCommunity");
        expect(true).toBe(true)
    });
});
