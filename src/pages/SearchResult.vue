<template>
  <user-card-list :user-list="userList" :loading="loading" />

  <van-empty
    v-if="!userList || userList.length < 1"
    description="搜索结果为空"
  />
</template>

<script setup lang="ts">
import qs from "qs";
import myAxios from "../plugins/myAxios";
import { showFailToast } from "vant";
const loading = ref<boolean>(true);

const route = useRoute();
const { tags } = route.query;
// console.log(tags);

const userList = ref([]);

onMounted(async () => {
  // 上述请求也可以按以下方式完成（可选）
  const userListData = await myAxios
    .get("/user/search/tags", {
      params: {
        tagNameList: tags,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    })
    .then(function (response: any) {
      // console.log("响应", response.data);
      // showSuccessToast("请求成功");
      return response.data;
    })
    .catch(function (error: any) {
      console.error(error);
      showFailToast("请求失败");
    });
  // console.log('aa',userListData);

  if (userListData) {
    userListData.forEach((user: { tags: string }) => {
      if (user.tags) {
        // console.log(user.tags);

        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
  loading.value = false;
});
</script>

<style></style>
