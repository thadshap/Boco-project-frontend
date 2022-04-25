import { shallowMount } from "@vue/test-utils";
import CategoryComponent from "@/components/CategoryComponent";

describe("CategoryComponent.vue", () => {
  it("renders props.title when passed", () => {
    const title = "Verktøy";
    const wrapper = shallowMount(CategoryComponent, {
      props: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });
});
