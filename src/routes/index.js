import { STORAGE_KEY } from "@/constants";
import { PERMISSION } from "@/constants/role";
import store from "@/store/index";
import storageUtils from "@/utils/storageUtils";
import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import { BUY_PRODUCT, HOME, LOGIN, MANAGER_STORE, STAFF, STORE } from "./path";

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
      meta: {
        requiresAuth: true,
        permissions: [
          PERMISSION.NAILER,
          PERMISSION.MANAGER,
          PERMISSION.STOCKER,
        ],
      },
    },
    {
      path: HOME,
      name: "Home",
      component: () => import("../pages/Home"),
      meta: { requiresAuth: true, permissions: [PERMISSION.NAILER, PERMISSION.MANAGER, PERMISSION.STOCKER] },
    },
    {
      path: STAFF.BILL_ORDER,
      name: "BillOrder",
      component: () => import("../pages/BillOrder"),
      meta: {
        requiresAuth: true,
        permissions: [PERMISSION.NAILER, PERMISSION.MANAGER],
      },
    },
    {
      path: MANAGER_STORE.IMPORT_PRODUCT,
      name: "ImportProduct",
      component: () => import("../pages/Import"),
      meta: {
        requiresAuth: true,
        permissions: [PERMISSION.MANAGER, PERMISSION.STOCKER],
      },
    },
    {
      path: BUY_PRODUCT,
      name: "BuyProduct",
      component: () => import("../pages/Buy-Product"),
      meta: {
        requiresAuth: true,
        permissions: [PERMISSION.MANAGER, PERMISSION.STOCKER, PERMISSION.NAILER],
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "All",
      component: () => import("../pages/Store"),
      meta: {
        requiresAuth: true,
        permissions: [PERMISSION.MANAGER, PERMISSION.STOCKER],
      },
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  NProgress.start();
  NProgress.set(1);
  const token = storageUtils.get(STORAGE_KEY.TOKEN_DATA)?.accessToken;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    await checkPermissionAndRedirect(to, token, next);
    next(LOGIN);
  } else {
    await checkPermissionAndRedirect(to, token, next);
    next();
  }
});

const checkPermissionAndRedirect = async (to, token, next) => {
  if (token) {
    const { isAuth, userData } = await store.dispatch("user/checkLogin");
    if (!isAuth) return next(LOGIN);

    if (to?.meta?.permissions?.includes(userData.permission)) {
      next();
    } else {
      next(STORE);
    }
    next(STORE);
  }
};

router.afterEach(() => {
  NProgress.done();
});

export default router;
