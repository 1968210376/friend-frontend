<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.userAccount"></van-cell>
    <van-cell title="修改个人信息" is-link to="/userinfo/update"> </van-cell>
    <van-cell title="我创建的队伍" is-link to="/userinfo/team/create">
    </van-cell>
    <van-cell title="我加入的队伍" is-link to="/userinfo/team/join"> </van-cell>
    <van-cell title="注销" @click="logout"
      ><template #right> <van-icon name="logout" size="18" /> </template
    ></van-cell>
  </template>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import myAxios from "../plugins/myAxios";
import { getCurrentUser } from "../services/user";

const user = ref();
const router = useRouter();
onMounted(async () => {
  user.value = await getCurrentUser();
});

// 注销
const logout = async () => {
  myAxios.post("/user/logout").then(async function () {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      showFailToast("用户未登录");
      router.replace("/user/login");
      return;
    }
  });
};
</script>

<style></style>
