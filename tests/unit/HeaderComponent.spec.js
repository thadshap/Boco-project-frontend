import { shallowMount } from "@vue/test-utils";
import HeaderComponent from "@/components/HeaderComponent";

describe("HeaderComponent.vue", () => {
    it("renders BorrowCommunity when passed", () => {
        const wrapper = shallowMount(HeaderComponent, {
        });
        expect(wrapper.text()).toMatch("BorrowCommunity");
    });
});
