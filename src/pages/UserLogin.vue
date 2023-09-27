<template>
  <!-- <h3 style="text-align: center">登录</h3> -->
  <p style="font-size: 1rem; padding-left: 30px">
    没有账号？去<router-link to="/user/register">注册</router-link>
  </p>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="userAccount"
        name="账号"
        label="账号"
        placeholder="请输入账号"
        :rules="[
          { required: true, pattern: userAccountReg, message: '请填写用户名' },
        ]"
      />
      <van-field
        v-model="userPassword"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码密码"
        :rules="[
          { required: true, pattern: passwordReg, message: '请填写密码' },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import myAxios from "../plugins/myAxios";
import { showFailToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const userAccount = ref("");
const userPassword = ref("");
const userAccountReg = /\w{4,}/;
const passwordReg = /\w{8,}/;

const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  // console.log("用户登录", res.data);

  if (res.code == 0 && res.data != null) {
    // showSuccessToast("登录成功");
    router.replace("/");
  } else {
    showFailToast("登录失败");
  }
};
</script>

<style scoped></style>
