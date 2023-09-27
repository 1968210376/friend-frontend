<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <div
        v-if="editUser.editKey == 'avatarUrl'"
        style="width: 100%; display: flex; justify-content: center"
      >
        <van-uploader
          :after-read="afterRead"
          style="
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
            overflow: hidden;
          "
        >
          <van-image
            width="10rem"
            height="10rem"
            fit="cover"
            :src="editUser.currentValue"
          >
            <van-icon
              name="edit"
              size="8rem"
              color="rgba(255,255,255,.8)"
              style="position: absolute; bottom: 1rem; right: 1rem"
            />
          </van-image>
        </van-uploader>
      </div>
      <div v-else>
        <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
        />
      </div>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-cell-group>
  </van-form>
</template>

<script setup lang="ts">
import { showFailToast, showLoadingToast, closeToast } from "vant";
import myAxios from "../plugins/myAxios";
import { getCurrentUser } from "../services/user";
import axios from "axios";
const router = useRouter();
const route = useRoute();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
});
const afterRead = async (file: any) => {
  // 此时可以自行将文件上传至服务器
  // console.log(file.file);
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
  });
  await axios({
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    url: "https://www.imgurl.org/api/v2/upload",
    data: {
      file: file.file,
      uid: "53cb5ee1fc1d557cd8cd003a1158b7df",
      token: "f65f3ff7c49e9e60dd2373be95bceb9c",
    },
  }).then(function (response) {
    console.log(response.data.data);
    editUser.value.currentValue = response.data.data.url;
    closeToast();
  });
};

const onSubmit = async () => {
  // todo 把 editKey、currentValue、editName 提交到后台
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    showFailToast("用户未登录");
    return;
  }
  // console.log("avatar", editUser.value.currentValue);

  const res = await myAxios.post("/user/update", {
    id: currentUser.id,
    [String(editUser.value.editKey)]: editUser.value.currentValue,
  });
  // console.log(res);

  if (res.code === 0 && res.data > 0) {
    // showSuccessToast("修改成功");
    router.push("/userinfo/update");
  } else {
    showFailToast("修改失败");
    // console.log("修改失败");
  }
};
</script>

<style></style>
