import { shallowMount } from "@vue/test-utils";
import UserSettings from "@/views/UserSettings";

jest.spyOn(UserSettings.methods, "disableChangeBtn")
  .mockImplementation(() => {})

jest.spyOn(UserSettings.methods, "getUserInfo")
  .mockImplementation(() => {})

jest.spyOn(UserSettings.methods, "existingUserImg")
  .mockImplementation(() => {})

describe("UserSettings", () => {
  it('should render a firstname input field and its belonging label', () => {
    const wrapper = shallowMount(UserSettings);
    expect(wrapper.find('[id="firstname"]').exists());
    expect(wrapper.find('label[htmlFor="firstname"]').exists());
  });
  it('should render a lastname input field and its belonging label', () => {
    const wrapper = shallowMount(UserSettings);
    expect(wrapper.find('[id="lastname"]').exists());
    expect(wrapper.find('label[htmlFor="lastname"]').exists());
  });
  it('should render a password input field and its belonging label', () => {
    const wrapper = shallowMount(UserSettings);
    expect(wrapper.find('[id="password"]').exists());
    expect(wrapper.find('label[htmlFor="passord"]').exists());
  });
  it('should render a repeat password input field and its belonging label', () => {
    const wrapper = shallowMount(UserSettings);
    expect(wrapper.find('[id="repeatPassword"]').exists());
    expect(wrapper.find('label[htmlFor="repeatPassword"]').exists());
  });
  it('test if something written in input field is as expected', () => {
    const wrapper = shallowMount(UserSettings);
    const input = wrapper.find('input[id="firstname"]')
    input.setValue('Kari')
    expect(input.element.value).toBe('Kari')

  });
  it("test that error message displays if input is not valid for password since it does not contain 8 characters, and change button get disabled", async () => {
    const wrapper = shallowMount(UserSettings);
    await wrapper.find('[id="password"]').setValue("hj");
    await wrapper.find('[id="repeatPassword"]').setValue("hj");
    await wrapper.find('[id="change"]').trigger("click");
    const errorMessagePassword = wrapper.find('#passwordError');
    expect(errorMessagePassword.text()).toBe('Passordet må minst bestå av 8 karakterer')
    expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
  });
  it("test that change button is disabled if no inputs have been changed", async () => {
    const wrapper = shallowMount(UserSettings);
    await wrapper.find('[id="password"]').setValue("");
    await wrapper.find('[id="repeatPassword"]').setValue("");
    await wrapper.find('[id="firstname"]').setValue("");
    await wrapper.find('[id="lastname"]').setValue("");
    expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
  });
  it("test that error message displays if repeat password is not same as password, and change button get disabled", async () => {
    const wrapper = shallowMount(UserSettings);
    await wrapper.find('[id="password"]').setValue("HunderErBedreEnnKatter");
    await wrapper.find('[id="repeatPassword"]').setValue("KatterErBedreEnnHunder");
    await wrapper.find('[id="change"]').trigger("click");
    const errorMessagePassword = wrapper.find('#repeatPasswordError');
    expect(errorMessagePassword.text()).toBe('Passordet er ikke lik det oppgitte passordet over')
    expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
  });
  it('should have input element', () => {
    const wrapper = shallowMount(UserSettings);
    const inputElement = wrapper.find('upload-pic-btn');
    expect(inputElement).toBeDefined();
  });
});
