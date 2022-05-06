import store from '@/store'

describe('store', () => {
    test('action, mutation and getter for current ad', async() => {
        const ad = {
            adId: 1,
            title: "skates",
            description: "size 36",
            price: 100
        };
        await store.dispatch("setCurrentAd", ad)
        const received = store.getters.currentAd
        expect(received).toStrictEqual(ad)
    })
    test('action, mutation and getter for logged in', async() => {
        const booleanLoggedIn = true;
        await store.dispatch("setLoggedIn", booleanLoggedIn)
        const received = store.getters.loggedIn;
        expect(received).toStrictEqual(booleanLoggedIn)
    })
    test('action, mutation and getter for last clicked main category', async() => {
        const lastMainCat = "ballsport";
        await store.dispatch("setLastClickedMainCat", lastMainCat)
        const received = store.getters.lastClickedMainCat;
        expect(received).toStrictEqual(lastMainCat)
    })
    test('action, mutation and getter for groupname', async() => {
        const groupname = "fotballklubben";
        await store.dispatch("setGroupName", groupname)
        const received = store.getters.getGroupName;
        expect(received).toStrictEqual(groupname)
    })
    test('action, mutation and getter for groupid', async() => {
        const groupid = 1;
        await store.dispatch("setGroupId", groupid)
        const received = store.getters.getGroupId;
        expect(received).toStrictEqual(groupid)
    })
    test('action, mutation and getter for messages', async() => {
        const messages = [
            {userId:2, message:"hei"},
            {userId:3, message:"halla"}
        ];
        await store.dispatch("setMessages", messages)
        const received = store.getters.getMessages;
        expect(received).toStrictEqual(messages)
    })
    test('action, mutation and getter for adding message', async() => {

        const message = {userId: 2, mess:"hva skjer"}
        await store.dispatch("addMessage", message)
        const received = store.getters.getMessages.pop();
        expect(received).toStrictEqual(message)
    })
    test('action, mutation and getter for mainCategories', async() => {

        const  mainCategories= [
            {id:2, name:"ballsport"},
            {id:3, name:"vannsport"}
        ];
        await store.dispatch("setMainCategories", mainCategories)
        const received = store.getters.getMainCategories;
        expect(received).toStrictEqual(mainCategories)
    })
    test('action, mutation and getter for subCategories', async() => {

        const  subCategories= [
            {id:5, name:"håndball"},
            {id:6, name:"fotball"}
        ];
        await store.dispatch("setSubCategories", subCategories)
        const received = store.getters.getSubCategories;
        expect(received).toStrictEqual(subCategories)
    })
    test('action, mutation and getter for subSubCategories', async() => {

        const  subSubCategories= [
            {id:7, name:"klær"},
            {id:4, name:"ball"}
        ];
        await store.dispatch("setSubSubCategories", subSubCategories)
        const received = store.getters.getSubSubCategories;
        expect(received).toStrictEqual(subSubCategories)
    })
})
