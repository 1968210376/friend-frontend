<template>
  <form action="/">
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
    v-model:active-id="activeIds"
    v-model:main-active-index="activeIndex"
    :items="tagList"
  >
    <template v-if="activeIndex === 3" #content>
      <!-- 可以使用 CellGroup 作为容器 -->
      <van-cell-group inset>
        <van-field
          v-model="value"
          label="自定义标签"
          placeholder="请输入标签名"
          label-align="top"
          center
          clearable
        >
          <template #button>
            <van-button size="small" type="primary" @click="addTag"
              >添加</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </template>
  </van-tree-select>
  <div style="padding: 12px">
    <van-button block type="primary" @click="onSubmit">保存</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCurrentUser } from "../services/user";
import { showFailToast, showSuccessToast } from "vant";
import myAxios from "../plugins/myAxios";
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
});
// console.log(editUser.value.currentValue);

const searchText = ref("");
const onSearch = () => {
  tagList.value = originTagList.map((parentTag) => {
    const tempChildrenTag = [...parentTag.children];
    const tempParentTag = { ...parentTag };
    tempParentTag.children = tempChildrenTag.filter((item) =>
      item.text.includes(searchText.value)
    );
    return tempParentTag;
  });
};
const onCancel = () => {
  searchText.value = "";
  tagList.value = originTagList;
};

const doClose = (tag: any) => {
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  });
};

// 已选中的标签
const activeIds = ref([]);
const tags = JSON.parse(editUser.value.currentValue);
tags.forEach((element) => {
  activeIds.value.push(element);
});
const activeIndex = ref(0);
const value = ref("");
const originTagList = [
  {
    text: "性别",
    children: [
      { text: "男", id: "男" },
      { text: "女", id: "女" },
    ],
  },
  {
    text: "年级",
    children: [
      { text: "大一", id: "大一" },
      { text: "大二", id: "大二" },
      { text: "大三", id: "大三" },
      { text: "大四", id: "大四" },
      { text: "研一", id: "研一" },
      { text: "研二", id: "研二" },
    ],
  },
  {
    text: "方向",
    children: [
      { text: "前端", id: "前端" },
      { text: "后端", id: "后端" },
      { text: "java", id: "java" },
      { text: "python", id: "python" },
    ],
  },
  {
    text: "自定义",
    children: [],
  },
];
let tagList = ref(originTagList);

function addTag() {
  activeIds.value.push(value.value);
  value.value = "";
}

const router = useRouter();
const onSubmit = async () => {
  // todo 把 editKey、currentValue、editName 提交到后台
  editUser.value.currentValue = JSON.stringify(activeIds.value);
  console.log(editUser.value.currentValue);

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
    showSuccessToast("保存成功");
    router.push("/userinfo/update");
  } else {
    showFailToast("保存失败");
    // console.log("修改失败");
  }
};
</script>

<style></style>
