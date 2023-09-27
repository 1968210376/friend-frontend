<template>
  <div id="teamPage">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      @search="doSearch"
    />
    <van-floating-bubble
      axis="xy"
      icon="add-o"
      magnetic="x"
      v-model:offset="offset"
      @click="doJoinTeam"
    />

    <!-- <van-button type="primary" @click="doJoinTeam">加入队伍</van-button> -->
    <team-card-list-my :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import myAxios from "../plugins/myAxios";

const router = useRouter();
const teamList = ref([]);
const searchText = ref("");
// const offset = ref({ x: 310, y: 480 });
const offset = ref({ x: 300, y: 555 });

const doJoinTeam = () => {
  router.push({
    path: "/team/add",
  });
};

const listTeam = async (val = "") => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
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

const doSearch = async (val: string | undefined) => {
  listTeam(val);
};
</script>

<style></style>
