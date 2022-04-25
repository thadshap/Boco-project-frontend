import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import DetailedAd from "@/views/DetailedAd";
import LendingPage from "@/views/LendingPage";
import UserSettings from "../views/UserSettings";
import MyProfile from "@/components/MyProfile";
import MyAds from "@/views/MyAds";
import Profile from "@/views/Profile";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Chat from "@/views/Chat";

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
    path: "/register",
    name: "Register",
    component: Register
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
    path: "/messages",
    name: "Messages",
    component: Chat,
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
      },
      {
        path: "/settings",
        name: "Settings",
        component: UserSettings
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
