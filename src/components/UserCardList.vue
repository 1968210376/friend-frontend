<template>
  <van-skeleton
    v-for="user in props.userList"
    title
    avatar
    :row="3"
    :loading="props.loading"
  >
    <van-card
      :desc="user.profile"
      :title="user.username"
      :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag
          plain
          type="primary"
          v-for="tag in user.tags"
          style="margin-right: 8px; margin-top: 8px"
          >{{ tag }}</van-tag
        >
      </template>
      <template #footer>
        <van-button size="mini" @click="connect">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import { UserType } from "../models/user";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}
const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  userList: [] as UserType[],
});

const connect= ()=>{
  
}
</script>

<style></style>
