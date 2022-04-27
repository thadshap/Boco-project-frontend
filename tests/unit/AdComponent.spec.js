import { shallowMount } from "@vue/test-utils";
import AdComponent from "@/components/AdComponent";
import store from "@/store"

describe("AdComponent.vue", () => {
    it("renders props when passed", () => {
        const id = 1;
        const title = "Motorsag";
        const price = 1000;
        const place = "Trondheim";
        const image = "BoCo.png";
        const wrapper = shallowMount(AdComponent, {
            global:{ plugins: [store]},
            props: { id,title,price,place,image },
        });
        expect(wrapper.text()).toMatch(title);
        expect(wrapper.text()).toMatch(place);
        expect(wrapper.text()).toMatch(price.toString());
    });
});
