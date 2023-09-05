<template>
  <!-- <van-button @click="doMatch">{{mode === "default"? "模式":""}}</van-button>
   -->
  <van-cell center title="匹配队友">
    <template #right-icon>
      <van-switch v-model="mode" />
    </template>
  </van-cell>

  <user-card-list :user-list="userList" :loading="loading" />

  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
import qs from "qs";
import myAxios from "../plugins/myAxios";
import { showFailToast } from "vant";
import { UserType } from "../models/user";
const userList = ref([{}, {}, {}] as Array<UserType>);

// type ModeType = "default" | "match";
// const mode = ref<ModeType>("default");
const mode = ref<boolean>(false);
const loading = ref<boolean>(true);

const loadData = async () => {
  let userListData = [];
  if (mode.value) {
    // 匹配模式
    const num = 5;
    userListData = await myAxios
      .get("/user/match", {
        params: {
          num,
        },
      })
      .then(function (response: any) {
        // console.log("响应", response.data);
        // showSuccessToast("请求成功");
        return response?.data;
      })
      .catch(function (error: any) {
        console.error(error);
        showFailToast("请求失败");
      });
  } else {
    // 普通模式分页查询
    userListData = await myAxios
      .get("/user/recommend", {
        params: {
          pageNum: 1,
          pageSize: 5,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      })
      .then(function (response: any) {
        // showSuccessToast("请求成功");
        return response.data;
      })
      .catch(function (error: any) {
        console.error(error);
        showFailToast("请求失败");
      });
  }
  // console.log("队友数据", userListData);
  if (userListData?.records) {
    userListData?.records.forEach((user: { tags: string }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData?.records;
  } else {
    userListData.forEach((user: { tags: string }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
  loading.value = false;
};

watchEffect(() => {
  loadData();
});
</script>

<style scoped>
.card {
  padding-bottom: 10px;
}
</style>
