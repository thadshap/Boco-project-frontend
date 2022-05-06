import { shallowMount } from "@vue/test-utils";
import Group from "@/views/Group";

jest.spyOn(window, 'alert').mockReturnValue(alert("Ugyldig epost"));

describe("Group", () => {
    it("test that empty group notification displays if groups is empty", async () => {
        const wrapper = shallowMount(Group);
        const text = await wrapper.find('[id="no-groups"]').text()
        expect(text).toBe('Her var det tomt! Start en chat ved å trykke på knappen under')
    });
});
describe("Group", () => {
    it("test that make group button displays", async () => {
        const wrapper = shallowMount(Group);
        const text = await wrapper.find('[id="make-chat-popup"]').text()
        expect(text).toBe('Lag gruppechat')
    });
});
describe("Group", () => {
    it("test that pressing the make group button displays form", async () => {
        const wrapper = shallowMount(Group);
        await wrapper.find('[id="make-chat-popup"]').trigger("click");
        const addEmailText = await wrapper.find('[id="add-email"]').text()
        const close = await wrapper.find('[id="close"]').text()
        expect(addEmailText).toBe('Legg til epost')
        expect(close).toBe('Lukk')
    });
});
describe("Group", () => {
    it("test that error message displays if input is invalid for email", async () => {
        const wrapper = shallowMount(Group);
        await wrapper.find('[id="make-chat-popup"]').trigger("click");
        await wrapper.find('[id="email"]').setValue("abcd");
        await wrapper.find('[id="add-email"]').trigger('click');
        expect(window.alert).toBeCalledWith('Ugyldig epost');
    });
});
describe("Group", () => {
    it("test that make group button displays if valid input is entered for email", async () => {
        const wrapper = shallowMount(Group);
        await wrapper.find('[id="make-chat-popup"]').trigger("click");
        await wrapper.find('[id="email"]').setValue("epost@epost.epost");
        await wrapper.find('[id="add-email"]').trigger('click');
        const makeGroup = await wrapper.find('[id="make-group"]')
        expect(makeGroup).toBeTruthy()
    });
});
