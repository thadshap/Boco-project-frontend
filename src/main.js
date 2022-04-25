import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
import GStore from './store/reactive';
import 'nprogress/nprogress.css';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'nprogress/nprogress.css';

import { fakeBackend } from "@/_helpers/fake-backend";
fakeBackend();

import { initFacebookSdk } from "@/_helpers/init-facebook-sdk";
import { jwtInterceptor } from "@/_helpers/jwt.interceptor";
import { errorInterceptor } from "@/_helpers/error.interceptor";

jwtInterceptor();
errorInterceptor()

initFacebookSdk().then(startApp);

function startApp() {
  createApp(App)
    .component('Datepicker', Datepicker)
    .use(store)
    .use(router)
    .use(OpenLayersMap)
    .provide("GStore", GStore)
    .mount("#app");
}



