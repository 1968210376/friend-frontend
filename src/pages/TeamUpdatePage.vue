<template>
  <div id="temAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[
            {
              required: true,
              message: '请填写队伍名',
            },
          ]"
        />
        <van-field
          v-model="addTeamData.description"
          rows="4"
          autosize
          type="textarea"
          name="description"
          label="队伍描述"
          placeholder="请输入队伍描述"
          :rules="[{ required: true, message: '请填写队伍描述' }]"
        />

        <van-field
          v-model="addTeamData.expireTime"
          is-link
          readonly
          name="calendar"
          label="过期时间"
          placeholder="点击选择过期日期"
          @click="showCalendar = true"
        />
        <van-calendar
          :min-date="date"
          v-model:show="showCalendar"
          @confirm="onConfirm"
        />
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group
              v-model="addTeamData.status"
              direction="horizontal"
            >
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-if="addTeamData.status == '2'"
          v-model="addTeamData.password"
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
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import myAxios from "../plugins/myAxios";

const router = useRouter();
const route = useRoute();

const date = new Date();
const formattedDate = (date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

// 需要用户填写的表单
const addTeamData = ref({});
const passwordReg = /\w{8,}/;
const id = route.query.id;

// 获取之前的队伍信息
onMounted(async () => {
  const res = await myAxios.get("/team/get", {
    params: {
      id: id,
    },
  });
  if (res?.code === 0) {
    // res.data.expireTime = formattedDate(res.data.expireTime);
    res.data.status = res.data.status + "";
    // console.log(addTeamData.value);
    addTeamData.value = res.data;
  } else {
    showFailToast("加载队伍信息失败，请稍后重试");
  }
});

// 日历初始化数据
const showCalendar = ref(false);
const onConfirm = (date) => {
  addTeamData.value.expireTime = formattedDate(date);
  // console.log(addTeamData.value.expireTime);
  showCalendar.value = false;
};

const onSubmit = async () => {
  if (id <= 0) {
    showFailToast("加载队伍失败");
    return;
  }

  const res = await myAxios.post("/team/update", addTeamData.value);
  // console.log(res);

  if (res?.code === 0 && res.data) {
    // showSuccessToast("更新成功");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
    showFailToast("更新失败");
  }
};
</script>

<style></style>
