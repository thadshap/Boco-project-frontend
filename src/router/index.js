import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage";
import DetailedAd from "@/views/DetailedAd";
import LendingPage from "@/views/LendingPage";
import UserSettings from "@/views/UserSettings";
import MyProfile from "@/views/MyProfile";
import MyAds from "@/views/MyAds";
import Profile from "@/views/Profile";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Chat from "@/views/Chat";
import Group from "@/views/Group"
import ResetPassword from "../views/ResetPassword";
import { authGuard } from "@/helpers/auth.guard";
import MyRentals from "@/views/MyRentals";
import UserProfile from "@/views/UserProfile";
import { redirectGuard } from "@/helpers/redirect.guard";
import ApproveRental from "@/views/ApproveRental";
import {rentalApprovalGuard} from "@/helpers/rentalApproval.guard";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/userProfile",
    name: "UserProfile",
    component: UserProfile
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: redirectGuard
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: redirectGuard
  },
  {
    path: "/auth/renewYourPassword",
    name: "ResetPassword",
    component: ResetPassword
  },
  {
    path: "/new_ad",
    name: "New Ad",
    component: LendingPage,
    beforeEnter: authGuard
  },
  {
    path: "/ad/:id",
    name: "Ad",
    component: DetailedAd,
    props: true
  },
  {
    path: "/chat/:id",
    name: "Chat",
    component: Chat,
    beforeEnter: authGuard
  },
  {
    path: "/approve_rental",
    name: "ApproveRental",
    component: ApproveRental,
    beforeEnter: rentalApprovalGuard
  },
  {
    path: "/groups",
    name: "Group",
    component: Group,
    beforeEnter: authGuard
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
    children: [
      {
        path: "/my_profile",
        name: "My profile",
        component: MyProfile,
        beforeEnter: authGuard
      },
      {
        path: "/ads",
        name: "Profile ads",
        component: MyAds,
        beforeEnter: authGuard
      },
      {
        path: "/settings",
        name: "Settings",
        component: UserSettings,
        beforeEnter: authGuard
      },
      {
        path: "/rentals",
        name: "My Rentals",
        component: MyRentals,
        beforeEnter: authGuard
      },
      {
        path: "*",
        redirect: "/"
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeResolve((to) => {
  if(to.fullPath.includes("/login/facebook")) {
    let route = to.fullPath.split(new RegExp("[/#]"));

    localStorage.setItem("jwtoken", route[3])

  } else if(to.fullPath.includes("/login/google")) {
    let route = to.fullPath.split(new RegExp("[/#]"));

    localStorage.setItem("jwtoken", route[3])

  }
})

export default router;
