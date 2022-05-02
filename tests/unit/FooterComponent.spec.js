import FooterComponent from "@/components/FooterComponent";
import {mount} from "@vue/test-utils";

describe("FooterComponent", () => {
    it("renders", () => {
        const wrapper = mount(FooterComponent)
        expect(wrapper.text()).toMatch("BoCo")
    })
})