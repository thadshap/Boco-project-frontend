import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import OpenLayersMap from "vue3-openlayers";
import Geolocation from 'ol/Geolocation';
import "vue3-openlayers/dist/vue3-openlayers.css";
import GStore from "./store/reactive";
import "nprogress/nprogress.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "nprogress/nprogress.css";
import gAuthPlugin from "vue3-google-oauth2";


let gauthClientId = "736018580187-kmhgjhg8i7ttrsh2k2b8gjk6v8jd1nsi.apps.googleusercontent.com";

createApp(App)
  .component("Datepicker", Datepicker)
  .use(store)
  .use(router)
  .use(OpenLayersMap)
    .use(Geolocation)
  .use(gAuthPlugin, {
    clientId: gauthClientId,
    prompt: "consent",
    fetch_basic_profile: true
  })
  .provide("GStore", GStore)
  .mount("#app");
// }
