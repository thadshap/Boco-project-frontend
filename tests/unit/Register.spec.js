import { shallowMount } from "@vue/test-utils";
import Register from "@/views/Register";

describe("Register", () => {
    it("test that error message displays if input is not valid for email", async () => {
        const wrapper = shallowMount(Register);
        await wrapper.find('[id="email"]').setValue("jkl");
        await wrapper.find('[id="registerBtn"]').trigger("click");
        const errorMessageEmail = wrapper.find('#emailError');
        expect(errorMessageEmail.text()).toBe('Ugyldig epost!')
    });
    it("test that error message displays if password is to short", async () => {
        const wrapper = shallowMount(Register);
        await wrapper.find('[id="password"]').setValue("hj");
        await wrapper.find('[id="repeatPassword"]').setValue("hj");
        await wrapper.find('[id="registerBtn"]').trigger("click");
        expect(wrapper.find('#passwordError')).toBeTruthy();
    });
    it("test that error message displays if the repeated password is different from password", async () =>{
        const wrapper = shallowMount(Register)
        await wrapper.find('[id="password"]').setValue("hjrwilbfassa");
        await wrapper.find('[id="repeatPassword"]').setValue("hjfdsnjifdsdsbfiu");
        await wrapper.find('[id="registerBtn"]').trigger("click");
        expect(wrapper.find('#passwordError')).toBeTruthy();
    })
    it("test that error displays if no input is detected ", async () => {
        const wrapper = shallowMount(Register);
        await wrapper.find('[id="password"]').setValue("");
        await wrapper.find('[id="email"]').setValue("");
        await wrapper.find('[id="firstname"]').setValue("");
        await wrapper.find('[id="lastname"]').setValue("");
        expect(wrapper.find('#passwordError')).toBeTruthy();
    });
});
