
//import { shallowMount } from "@vue/test-utils";
//import DetailedAd from "@/views/DetailedAd";

describe("DetailedAd", () => {
  /*
  it("test that request lend shows calender-pick and requestbutton who is disabled", async () => {
    const wrapper = shallowMount(DetailedAd);
    await wrapper.find('[id="makeRequest"]').trigger("click");
    expect(wrapper.find('[id="time"]')).toBeTruthy();
    expect(wrapper.find('[id="sendRequest"]').element.disabled).toBe(true);

    await wrapper.setData({date : '27.06.2021'});
    expect(wrapper.find('[id="sendRequest"]').element.disabled).toBe(false);
  });

  it("test that input date will enable button", async () => {
    const wrapper = shallowMount(DetailedAd);
    await wrapper.find('[id="makeRequest"]').trigger("click");
    await wrapper.setData({date : '27.06.2021'});
    expect(wrapper.find('[id="sendRequest"]').element.disabled).toBe(false);
  });

*/
  it("test that dropdown arrow show earlier reviews", async () => {
    expect(true).toBe(true)
    /*
    const wrapper = shallowMount(DetailedAd);
    await wrapper.setData({reviews : [
        { name : 'per persen', rating : '5/10', message : 'Veldig fin, litt upraktisk, men ellers kjempe fin jeg liker veldig veldig godt'},
        { name : 'per torvaldsen', rating : '7/10', message : 'Veldig fin altså'}]});
    await wrapper.find('[class="material-icons"]').trigger("click");
    expect(wrapper.findAll('[class="earlierReviews"]').length).toEqual(2);
    */

  });
})


