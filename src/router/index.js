import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import About from "@/views/About.vue";
import DetailedAd from "@/views/DetailedAd";
import LendingPage from "@/views/LendingPage";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
