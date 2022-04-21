import { createRouter, createWebHistory } from "vue-router";
//import Home from "../views/Home.vue";
import MainPage from "@/views/MainPage";
import About from "@/views/About.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
