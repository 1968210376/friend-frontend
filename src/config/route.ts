import IndexVue from "../pages/Index.vue";
import TeamVue from "../pages/Team.vue";
import UserUpdate from "../pages/UserUpdate.vue";
import Search from "../pages/Search.vue";
import EditUser from "../pages/EditUser.vue";
import EditTag from "../pages/addTag.vue";
import SearchResultVue from "../pages/SearchResult.vue";
import UserLoginPage from "../pages/UserLogin.vue";
import UserRegisterVue from "../pages/UserRegister.vue";
import TeamAddPageVue from "../pages/TeamAddPage.vue";
import TeamUpdatePageVue from "../pages/TeamUpdatePage.vue";
import UserTeamCreate from "../pages/UserTeamCreate.vue";
import UserTeamJoin from "../pages/UserTeamJoin.vue";

// 定义路由
const routes = [
  { path: "/", component: IndexVue },
  { path: "/search", title: "搜索队友", component: Search },
  { path: "/team", title: "队伍", component: TeamVue },
  { path: "/team/add", title: "创建队伍", component: TeamAddPageVue },
  { path: "/team/update", title: "编辑队伍", component: TeamUpdatePageVue },
  { path: "/user/login", title: "登录", component: UserLoginPage },
  { path: "/user/register", title: "注册", component: UserRegisterVue },
  { path: "/userinfo/update", title: "用户信息", component: UserUpdate },
  { path: "/userinfo/edit", title: "编辑信息", component: EditUser },
  { path: "/userinfo/edittag", title: "编辑标签", component: EditTag },
  { path: "/userinfo/list", title: "搜索结果", component: SearchResultVue },
  {
    path: "/userinfo/team/create",
    title: "我创建的队伍",
    component: UserTeamCreate,
  },
  {
    path: "/userinfo/team/join",
    title: "我加入队伍",
    component: UserTeamJoin,
  },
];
export default routes;
