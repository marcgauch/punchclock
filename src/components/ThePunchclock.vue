<template>
  <el-card>
    <template #header> Punchclock {{ time }} </template>
    <el-button
      type="primary"
      @click="eventStore.toggleWorking()"
      :icon="Clock"
    />
    <el-popconfirm
      title="Are you sure?"
      confirm-button-type="danger"
      @confirm="eventStore.clearStorage()"
    >
      <template #reference>
        <el-button type="danger">Clear Storage</el-button>
      </template>
    </el-popconfirm>
    <!--<el-button type="primary" @click="eventStore.shuffle()">shuffle</el-button>-->
    <!--<pre
      >{{ eventStore.events }}
    </pre>-->
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Clock } from "@element-plus/icons-vue";
import { useEventsStore } from "@/stores/events";
const eventStore = useEventsStore();
const time = ref("00:00:00");

const updateTime = () => {
  const d = new Date();
  const hrs = `0${d.getHours()}`.slice(-2);
  const min = `0${d.getMinutes()}`.slice(-2);
  const sec = `0${d.getSeconds()}`.slice(-2);
  time.value = `${hrs}:${min}:${sec}`;
};
updateTime();
setInterval(updateTime, 250);
</script>
