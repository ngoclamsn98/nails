import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import store from "@/store/index";
import { getToken } from "@/utils";
import { STAFF, LOGIN } from "./path";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: LOGIN,
      name: "Login",
      component: () => import("../pages/Login"),
      meta: { requiresAuth: false },
    },
    {
      path: STAFF.HOME,
      name: "Home",
      component: () => import("../pages/Home"),
      meta: { requiresAuth: true },
    },
    {
      path: STAFF.BILL_ORDER,
      name: "BillOrder",
      component: () => import("../pages/Staff/BillOrder"),
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
    next(LOGIN);
  } else {
    if (token) {
      handleInfoUser(to, from, next);
      next(STAFF.HOME);
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
