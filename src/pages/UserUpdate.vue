<template>
  <template v-if="user">
    <van-cell
      title="头像"
      is-link
      @click="toEdit('avatarUrl', '头像', user.avatarUrl)"
      style="line-height: 48px"
    >
      <img
        :src="user.avatarUrl"
        alt=""
        style="width: 50px; height: 50px; border-radius: 50%"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.username"
      @click="toEdit('username', '昵称', user.username)"
    />
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell
      title="性别"
      is-link
      :value="user.gender == 0 ? '男' : '女'"
      @click="show = true"
    />
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-radio-group v-model="checked" v-on:change="updateGender">
        <van-cell-group inset>
          <van-cell title="男" clickable @click="checked = '0'">
            <template #right-icon>
              <van-radio name="0" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="checked = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <van-cell
      title="电话"
      is-link
      :value="user.phone"
      @click="toEdit('phone', '电话', user.phone)"
    />
    <van-cell
      title="邮箱"
      is-link
      :value="user.email"
      @click="toEdit('email', '邮箱', user.email)"
    />
    <van-cell title="注册时间" :value="user.createTime" />
    <van-cell
      title="标签"
      is-link
      @click="toEdit('tags', '标签', user.tags)"
    ></van-cell>
    
  </template>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getCurrentUser } from "../services/user";
import myAxios from "../plugins/myAxios";

const checked = ref("0");
const show = ref(false);
const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
});

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: "/userinfo/edit",
    query: {
      editKey,
      editName,
      currentValue,
    },
  });
};

const updateGender = async (gender: any) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    showFailToast("用户未登录");
    return;
  }
  const res = await myAxios.post("/user/update", {
    id: currentUser.id,
    gender,
  });
  // console.log(res);
  show.value = false;
  user.value = await getCurrentUser();
  if (res.code === 0 && res.data > 0) {
    // showSuccessToast("修改成功");
    router.push("/userinfo");
  } else {
    showFailToast("修改失败");
    // console.log("修改失败");
  }
};


</script>

<style></style>
