import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import store from "@/store/index";
import { getToken } from "@/utils";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login/index.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      name: "Home",
      component: () => import("../pages/Home/index.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  NProgress.set(1);
  const token = getToken();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      handleInfoUser(to, from, next);
      return;
    }
    next("login");
  } else {
    if (token) {
      handleInfoUser(to, from, next);
      next("/");
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

const handleInfoUser = async (to, from, next) => {
  try {
    await store.dispatch("user/checkLogin");
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default router;
