import { shallowMount } from "@vue/test-utils";
import ResetPassword from "../../src/views/ResetPassword";

describe("ResetPassword.vue", () => {
    it("test that error message displays if input is not valid for password since it does not contain 8 characters, and change button get disabled", async () => {
        const wrapper = shallowMount(ResetPassword);
        await wrapper.find('[id="password"]').setValue("hj");
        await wrapper.find('[id="repeatPassword"]').setValue("hj");
        await wrapper.find('[id="change"]').trigger("click");
        const errorMessagePassword = wrapper.find('#passwordError');
        expect(errorMessagePassword.text()).toBe('Passordet må minst bestå av 8 karakterer')
        expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
    });
    it('should render a password input field and its belonging label', () => {
        const wrapper = shallowMount(ResetPassword);
        expect(wrapper.find('[id="password"]').exists());
        expect(wrapper.find('label[htmlFor="passord"]').exists());
    });
    it('should render a repeat password input field and its belonging label', () => {
        const wrapper = shallowMount(ResetPassword);
        expect(wrapper.find('[id="repeatPassword"]').exists());
        expect(wrapper.find('label[htmlFor="repeatPassword"]').exists());
    });
    it("test that error message displays if repeat password is not same as password, and change button get disabled", async () => {
        const wrapper = shallowMount(ResetPassword);
        await wrapper.find('[id="password"]').setValue("HunderErBedreEnnKatter");
        await wrapper.find('[id="repeatPassword"]').setValue("KatterErBedreEnnHunder");
        await wrapper.find('[id="change"]').trigger("click");
        const errorMessagePassword = wrapper.find('#repeatPasswordError');
        expect(errorMessagePassword.text()).toBe('Passordet er ikke lik det oppgitte passordet over')
        expect(wrapper.find('[id="change"]').element.disabled).toBe(true);
    });
});
