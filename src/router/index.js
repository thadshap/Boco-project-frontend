import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import About from "@/views/About.vue";
import DetailedAd from "@/views/DetailedAd";

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
