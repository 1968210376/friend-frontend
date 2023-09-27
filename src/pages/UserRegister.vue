<template>
  <!-- <h3 style="text-align: center">注册</h3> -->
  <p style="font-size: 1rem; padding-left: 30px">
    已有账号？去<router-link to="/user/login">登录</router-link>
  </p>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="userAccount"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[
          { required: true, pattern: userAccountReg, message: '请填写用户名' },
        ]"
      />
      <van-field
        v-model="userPassword"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, pattern: passwordReg, message: '请填写密码' },
        ]"
      />
      <van-field
        v-model="checkPassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, pattern: passwordReg, message: '请填写密码' },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
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
const checkPassword = ref("");
const planetCode = ref("");
const userAccountReg = /\w{4,}/;
const passwordReg = /\w{8,}/;

const onSubmit = async () => {
  const res = await myAxios.post("user/register", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    planetCode: planetCode.value,
  });
  // console.log("用户注册", res.data);

  if (res.code == 0 && res.data != null) {
    // showSuccessToast("注册成功");
    router.push("/user/login");
  } else {
    showFailToast("注册失败");
  }
};
</script>

<style scoped></style>
