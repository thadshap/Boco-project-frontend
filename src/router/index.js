import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import DetailedAd from "@/views/DetailedAd";
import LendingPage from "@/views/LendingPage";
import MyProfile from "@/components/MyProfile";
import MyAds from "@/views/MyAds";
import Profile from "@/views/Profile";
import Login from "@/views/Login";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
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
    path: "/profile",
    name: "Profile",
    component: Profile,
    children: [
      {
        path: "/my_profile",
        name: "My profile",
        component: MyProfile
      },
      {
        path: "/ads",
        name: "Profile ads",
        component: MyAds
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
