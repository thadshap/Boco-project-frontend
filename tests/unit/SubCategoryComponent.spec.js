import { shallowMount } from "@vue/test-utils";
import SubCategoryComponent from "@/components/SubCategoryComponent";

describe("SubCategoryComponent.vue", () => {
  it("Renders component", () => {
    const label = "Sport";
    const categoryType = "underkategori";

    const wrapper = shallowMount(SubCategoryComponent, {
      props: {
        label,
        categoryType
      }
    })

    expect(wrapper.find("label").exists()).toBeTruthy()
  })

  it("Renders correct label", () => {
    const label = "Sport";
    const categoryType = "underkategori";

    const wrapper = shallowMount(SubCategoryComponent, {
      props: {
        label,
        categoryType
      }
    })

    expect(wrapper.find("label").text()).toBe(label)
  })

  it("Renders correct id on input", () => {
    const label = "Sport";
    const categoryType = "underkategori";

    const wrapper = shallowMount(SubCategoryComponent, {
      props: {
        label,
        categoryType
      }
    })

    expect(wrapper.find("input").attributes("id")).toBe(label)
  })
})