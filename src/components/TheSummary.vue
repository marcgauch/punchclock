<template>
  <el-card>
    <template #header> Summary </template>
    <el-row v-if="total !== null">
      <el-col :span="8">
        <TimeTag :display-value="`${total} min`" :clipboard-value="total" />
      </el-col>
      <el-col :span="8">
        <TimeTag
          :display-value="`${Math.floor(total / 60)} hrs ${total % 60} min`"
          :clipboard-value="HHMM"
        />
      </el-col>
      <el-col :span="8">
        <TimeTag
          :display-value="`${(total / 60).toFixed(2)} hours`"
          :clipboard-value="(total / 60).toFixed(2)"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventsStore } from "@/stores/events";
import TimeTag from "@/components/history/TimeTag.vue";
const eventStore = useEventsStore();
const total = computed(() => eventStore.getTotalTime);

const hours = computed(() => Math.floor(total.value / 60));
const minutes = computed(() => Math.floor(total.value % 60));

const HHMM = computed(() => {
  const h = hours.value;
  const m = `0${minutes.value}`.slice(-2);
  return `${h}:${m}`;
});
</script>
