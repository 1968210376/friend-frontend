// 定义路由
const routes = [
  { path: "/", component: () => import("../pages/Index.vue") },
  { path: "/search", title: "搜索队友", component: () => import("../pages/Search.vue")},
  { path: "/team", title: "队伍", component: () => import("../pages/Team.vue")},
  { path: "/team/add", title: "创建队伍", component: () => import("../pages/TeamAddPage.vue")},
  { path: "/team/update", title: "编辑队伍", component: () => import("../pages/TeamUpdatePage.vue") },
  { path: "/user/login", title: "登录", component: () => import("../pages/UserLogin.vue") },
  { path: "/user/register", title: "注册", component: () => import("../pages/UserRegister.vue") },
  { path: "/userinfo/update", title: "用户信息", component: () => import("../pages/UserUpdate.vue") },
  { path: "/userinfo/edit", title: "编辑信息", component: () => import("../pages/EditUser.vue") },
  { path: "/userinfo/edittag", title: "编辑标签", component: () => import("../pages/addTag.vue") },
  { path: "/userinfo/list", title: "搜索结果", component: () => import("../pages/SearchResult.vue") },
  { path: "/userinfo/team/create", title: "我创建的队伍", component: () => import("../pages/UserTeamCreate.vue") },
  { path: "/userinfo/team/join", title: "我加入队伍", component: () => import("../pages/UserTeamJoin.vue") },
];
export default routes;
