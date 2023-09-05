<template>
  <van-card
    v-for="team in props.teamList"
    :desc="team.description"
    :title="`${team.name}`"
    :thumb="`https://i.wpic.cc/u/2023/08/27/64eb3b91cfce9.jpg`"
  >
    <template #tags>
      <van-tag
        plain
        type="success"
        style="margin-right: 8px; margin-top: 8px"
        >{{ teamStatusENUM[team.status] }}</van-tag
      >
    </template>
    <template #bottom>
      <van-tag plain>
        <van-icon name="friends-o" />
        {{ "队伍人数：" + team.hasJoinNum + "/" + team.maxNum }}
      </van-tag>
      <van-tag plain>
        {{ "有效期：" + timeDifference(team.expireTime) + "天" }}
      </van-tag>
    </template>
    <template #footer>
      <van-button
        type="primary"
        v-if="!team.hasJoin"
        plain
        @click="
          () => {
            joinTeamId = team.id;
            if (team.status === 0) {
              doJoinTeam();
            } else {
              show = true;
            }
          }
        "
        size="mini"
        >加入队伍</van-button
      >
      <van-button
        v-if="team.userId === currentUser?.id"
        size="mini"
        type="primary"
        plain
        @click="doEditTeam(team.id)"
        icon="edit"
        >修改</van-button
      >
      <van-button
        v-if="team.hasJoin && team.userId !== currentUser?.id"
        size="mini"
        type="danger"
        plain
        @click="quitTeam(team.id)"
        >退出队伍</van-button
      >
      <van-button
        v-if="team.userId === currentUser?.id"
        size="mini"
        type="danger"
        plain
        @click="deleteTeam(team.id)"
        >解散队伍</van-button
      >
    </template>
  </van-card>
  <van-dialog
    v-model:show="show"
    title="请输入队伍密码"
    show-cancel-button
    @confirm="doJoinTeam()"
    @cancel="doCancel()"
  >
    <!-- 输入密码 -->
    <van-field v-model="password" type="password" />
  </van-dialog>
</template>

<script setup lang="ts">
import { TeamType } from "../models/team";
import { teamStatusENUM } from "../constants/team";
import myAxios from "../plugins/myAxios";
import { showNotify } from "vant";
import { getCurrentUserState } from "../states/user";
// import { getCurrentUser } from "../services/user";
const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUserState();
  // console.log(currentUser.value);
  // console.log(props.teamList);
});

const router = useRouter();
const timeDifference = (date) => {
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1); // 计算时间差的绝对值，以毫秒为单位
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 将毫秒转换为天

  return diffDays;
};

interface TeamCardListProps {
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType[],
});
const joinTeamId = ref<number>();
const show = ref(false);
const password = ref("");

const doJoinTeam = async () => {
  let res;
  res = await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password: password.value,
  });

  if (res?.code === 0) {
    // showSuccessToast("加入成功");
    router.go(0);
  } else {
    // showFailToast("加入失败" + (res.description ? `,${res.description}` : ""));
    showNotify({
      type: "danger",
      message: "加入失败" + (res?.description ? `,${res?.description}` : ""),
    });
  }
  password.value = "";
};

const doCancel = () => {
  joinTeamId.value = Number("");
  password.value = "";
};

// 跳转队伍更新页--通过url地址querystring携带数据
const doEditTeam = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id,
    },
  });
};

const quitTeam = async (teamId: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId,
  });
  if (res?.code === 0) {
    // showSuccessToast("退出成功");
    router.go(0);
  } else {
    // showFailToast("加入失败" + (res.description ? `,${res.description}` : ""));
    showNotify({
      type: "danger",
      message: "退出失败" + (res?.description ? `,${res?.description}` : ""),
    });
  }
};

const deleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    id,
  });
  if (res?.code === 0) {
    // showSuccessToast("解散成功");
    router.go(0);
  } else {
    // showFailToast("加入失败" + (res.description ? `,${res.description}` : ""));
    showNotify({
      type: "danger",
      message: "解散失败" + (res?.description ? `,${res?.description}` : ""),
    });
  }
};
</script>

<style></style>
