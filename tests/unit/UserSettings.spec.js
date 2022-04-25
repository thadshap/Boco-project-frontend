import { shallowMount } from "@vue/test-utils";
import UserSettings from "@/views/UserSettings";

describe("UserSettings", () => {
  it("test that error message displays if input is not valid for email, and change button get disabled", async () => {
    const wrapper = shallowMount(UserSettings);
    await wrapper.find('[id="email"]').setValue("jkl");
    await wrapper.find('[id="change"]').trigger("click");
    const errorMessageEmail = wrapper.find('#emailError');
    expect(errorMessageEmail.text()).toBe('Ugyldig epost!')
    expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
  });
  it("test that error message displays if input is not valid for password, and change button get disabled", async () => {
    const wrapper = shallowMount(UserSettings);
    await wrapper.find('[id="password"]').setValue("hj");
    await wrapper.find('[id="change"]').trigger("click");
    const errorMessageEmail = wrapper.find('#passwordError');
    expect(errorMessageEmail.text()).toBe('Passordet må minst bestå av 8 karakterer')
    expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
  });
  it("test that change button is disabled if no inputs have been changed", async () => {
    const wrapper = shallowMount(UserSettings);
    await wrapper.find('[id="password"]').setValue("");
    await wrapper.find('[id="email"]').setValue("");
    await wrapper.find('[id="firstname"]').setValue("");
    await wrapper.find('[id="lastname"]').setValue("");
    expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
  });
});
