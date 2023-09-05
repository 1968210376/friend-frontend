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
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
const activeIndex = ref(0);
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
      { text: "大3", id: "大3" },
      { text: "大4", id: "大4" },
      { text: "大5", id: "大5" },
      { text: "大6", id: "大6" },
    ],
  },
];
let tagList = ref(originTagList);

const router = useRouter();
const doSearchResult = () => {
  router.push({
    path: "/userinfo/list",
    query: {
      tags: activeIds.value,
    },
  });
};
</script>

<style></style>
