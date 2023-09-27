<template>
  <van-nav-bar
    v-show="indexPage"
    :title="title"
    right-text="按钮"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <van-nav-bar
    v-show="!indexPage"
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    right-text="按钮"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view />
  </div>
  <van-tabbar route v-show="showTabbar">
    <van-tabbar-item icon="home-o" to="/" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/team" name="team"
      >队伍</van-tabbar-item
    >
    <van-tabbar-item icon="setting-o" to="/userinfo/update" name="userinfo"
      >个人</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import routes from "../config/route";
const router = useRouter();
const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push("/search");
};
// const route = useRoute();
// const active = ref(0);
// const onChange = (index: any) => {
//   // console.log(index);
// };
// 监听当前路由
const DEFAULT_TITLE = "队友匹配系统";
const title = ref(DEFAULT_TITLE);
router.beforeEach((to) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  });
  title.value = route?.title ?? DEFAULT_TITLE;
});

const indexPage = ref(true);
const showTabbar = ref(true);
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    // console.log(newValue.path, newValue.path == "/");
    if (newValue.path == "/" || /^\/user\//.test(newValue.path)) {
      indexPage.value = true;
    } else {
      indexPage.value = false;
    }
    if (/^\/user\//.test(newValue.path)) {
      showTabbar.value = false;
    } else {
      showTabbar.value = true;
    }
  },
  { immediate: true }
);
</script>

<style>
#content {
  padding-bottom: 50px;
}
</style>
