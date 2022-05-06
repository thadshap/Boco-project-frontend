import { shallowMount } from "@vue/test-utils";
import AdComponent from "@/components/AdComponent";
import store from "@/store"


describe("AdComponent.vue", () => {
    it("renders props when passed", () => {
        expect(true).toBe(true)
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
        expect(wrapper.text()).toContain(`${title}${price} kr Trondheim Send melding  Til annonse`);
    });
});
