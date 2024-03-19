import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import { getToken } from "../untils";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login/index.vue"),
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
  const token = getToken();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      handleInfoUser(to, from, next);
    } else {
      next("/login");
    }
  } else {
    if (token) {
      await handleInfoUser(to, from, next);
      switch (to.name) {
        case "Login":
        case "Home":
          next({ path: "/" });
          break;
        default:
          next();
          break;
      }
    } else {
      next();
    }
  }
});

const handleInfoUser = async (to, from, next) => {
  const token = getToken();
  if (token) {
    try {
      await store.dispatch("user/checkLogin");
      next();
    } catch (error) {
      removeToken();
      next({ path: "/login" });
    }
  } else {
    next();
  }
};

export default router;
