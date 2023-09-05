<template>
  <div id="teamPage">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      @search="doSearch"
    />
    <van-tabs v-model:active="active" animated sticky @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>

    <van-floating-bubble
      axis="lock"
      v-model:offset="offset"
      icon="add-o"
      @click="doAddTeam"
    />

    <!-- <van-button type="primary" @click="doJoinTeam">加入队伍</van-button> -->
    <team-card-list :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import myAxios from "../plugins/myAxios";

const router = useRouter();
const teamList = ref([]);
const searchText = ref("");
const active = ref("public");
// const offset = ref({ x: 310, y: 480 });
const offset = ref({ x: 168, y: 555 });

const onTabChange = (name) => {
  if (name === "public") {
    listTeam(searchText.value, 0);
  } else {
    listTeam(searchText.value, 2);
  }
};

// 加入队伍
const doAddTeam = () => {
  router.push({
    path: "/team/add",
  });
};

// 搜索队伍

const listTeam = async (val = "", status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      status,
      pageNum: 1,
    },
  });
  // console.log(res);
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("加载队伍失败，请刷新重试");
  }
};

onMounted(() => {
  listTeam();
});

const doSearch = async (val: string | undefined, status: number) => {
  listTeam(val, status);
};
</script>

<style></style>
