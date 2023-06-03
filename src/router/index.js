// Composables
import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Books from "../views/Books.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Book from "../views/Book.vue";
import BookPart from "@/components/BookPart.vue";
import Profile from "../views/Profile.vue";
import AppE404 from "../views/E404.vue";
import { useUserStore } from "@/store/userStore";
import { useMainStore } from "@/store/mainStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/books",
    name: "books",
    component: Books,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/book/:id",
    name: "book",
    component: Book,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/book/:bookId/part/:partId",
    name: "bookPart",
    component: BookPart,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/:any(.*)", // .*
    name: "error",
    component: AppE404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// функция роутер гард
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // const isUserAuthenticated = userStore.isUserAuthenticated;

  // if (
  //   isUserAuthenticated === false &&
  //   to.name !== "signin" &&
  //   to.name !== "signup"
  // ) {
  //   // Redirect to signin page if user is not authenticated
  //   next({ name: "signin" });
  // } else {
  //   next();
  // }

  // проверка требуется ли аутентификация пользователя для входа на роут

  userStore.INIT_AUTH().then((user) => {
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      if (user) {
        next();
      } else {
        // Redirect to signin page if user is not authenticated
        next({ name: "signin" });
      }
    } else {
      next();
    }
  });
});

export default router;
