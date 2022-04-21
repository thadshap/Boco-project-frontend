import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import About from "@/views/About.vue";
import DetailedAd from "@/views/DetailedAd";
import LendingPage from "@/views/LendingPage";
import UserSettings from "../views/UserSettings";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/new_ad",
    name: "New Ad",
    component: LendingPage
  },
  {
    path: "/ad",
    name: "Ad",
    component: DetailedAd,
  },
  {
    path: "/userSettings",
    name: "UserSettings",
    component: UserSettings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
