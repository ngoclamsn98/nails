import store from "@/store/index";
import storageUtils from "@/utils/storageUtils";
import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import { LOGIN, STAFF, STORE, IMPORT } from "./path";
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
      path: STORE,
      name: "Store",
      component: () => import("../pages/Store"),
      meta: { requiresAuth: true },
    },
    {
      path: STAFF.HOME,
      name: "Home",
      component: () => import("../pages/Staff/Home"),
      meta: { requiresAuth: true },
    },
    {
      path: STAFF.BILL_ORDER,
      name: "BillOrder",
      component: () => import("../pages/Staff/BillOrder"),
      meta: { requiresAuth: true },
    },
    {
      path: STAFF.PRODUCT,
      name: "Product",
      component: () => import("../pages/Staff/Product"),
      meta: { requiresAuth: true },
    },
    {
      path: IMPORT.HOME,
      name: "Import",
      component: () => import("../pages/Import/Home"),
      meta: { requiresAuth: true },
    },
    {
      path: IMPORT.IMPORT_PRODUCT,
      name: "ImportProduct",
      component: () => import("../pages/Import/Import"),
      meta: { requiresAuth: true },
    },
    {
      path: IMPORT.PRODUCT,
      name: "BuyProduct",
      component: () => import("../pages/Import/Product"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "All",
      component: () => import("../pages/Store"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  NProgress.set(1);
  const token = storageUtils.get("token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      handleInfoUser(to, from, next);
      return;
    }
    next(LOGIN);
  } else {
    if (token) {
      handleInfoUser(to, from, next);
      next(STORE);
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
