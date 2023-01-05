<template>
  <el-card v-if="entry">
    <el-row>
      <el-col :span="5">
        {{ entry.type }}
      </el-col>
      <el-col :span="4">
        {{ entry.date.ISO }}
      </el-col>
      <el-col :span="3">
        {{ entry.date.fullHour }}:{{ entry.date.fullMinute }}
      </el-col>
      <el-col :span="12">
        <el-row v-if="entry.date.differenceToPrevious !== null">
          <el-col :span="8">
            <TimeTag
              :display-value="`${differenceToPrevious} min`"
              :clipboard-value="differenceToPrevious"
            />
          </el-col>
          <el-col :span="8">
            <TimeTag
              :display-value="`${hours} hrs ${minutes} min`"
              :clipboard-value="HHMM"
            />
          </el-col>
          <el-col :span="8">
            <TimeTag
              :display-value="`${hoursDecimal} hrs`"
              :clipboard-value="hoursDecimal"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventsStore } from "@/stores/events";
import TimeTag from "./TimeTag.vue";

const props = defineProps(["entryId"]);
const eventStore = useEventsStore();
const entry = computed(() => eventStore.getEntryById(props.entryId));

const differenceToPrevious = computed(
  () => entry.value?.date.differenceToPrevious || 0
);
const hours = computed(() => Math.floor(differenceToPrevious.value / 60));
const minutes = computed(() => Math.floor(differenceToPrevious.value % 60));
const hoursDecimal = computed(() =>
  (differenceToPrevious.value / 60).toFixed(2)
);

const HHMM = computed(() => {
  const h = hours.value;
  const m = `0${minutes.value}`.slice(-2);
  return `${h}:${m}`;
});
</script>
