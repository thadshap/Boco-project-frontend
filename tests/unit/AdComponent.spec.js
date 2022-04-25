import { shallowMount } from "@vue/test-utils";
import AdComponent from "@/components/AdComponent";

describe("AdComponent.vue", () => {
    it("renders props when passed", () => {
        const title = "Motorsag";
        const price = 1000;
        const place = "Trondheim";
        const image = "BoCo.png";
        const wrapper = shallowMount(AdComponent, {
            props: { title,price,place,image },
        });
        expect(wrapper.text()).toMatch(title);
        expect(wrapper.text()).toMatch(place);
        expect(wrapper.text()).toMatch(price.toString());
    });
});
