import { createApp } from "vue";
import App from "./App.vue";
import "vant/es/toast/style";
import "vant/es/notify/style";
import * as VueRouter from "vue-router";
import routes from "./config/route";
import { getCurrentUser } from "./services/user";

const app = createApp(App);

const router = VueRouter.createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

//3.判断每次路由切换的时候，是否有token令牌
router.beforeEach(async (to, from, next) => {
  if (!/^\/user\//.test(to.path)) {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      //说明用户已经登录了
      next();
    } else {
      next("/user/login"); //如果用户没有登录直接跳转到登录界面进行用户登录
    }
  } else {
    next();
  }
});

app.use(router).mount("#app");
