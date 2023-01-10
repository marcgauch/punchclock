<template>
  <div v-if="differenceToPrevious !== null">
    <TimeTag :display-value="`${dtp} min`" :clipboard-value="dtp" />
    <el-divider direction="vertical" />
    <TimeTag
      :display-value="`${hours} hrs ${minutes} min`"
      :clipboard-value="HHMM"
    />
    <el-divider direction="vertical" />
    <TimeTag
      :display-value="`${hoursDecimal} hrs`"
      :clipboard-value="hoursDecimal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TimeTag from "./TimeTag.vue";

const props = defineProps<{
  differenceToPrevious: number | null;
}>();

const dtp = computed(() => props.differenceToPrevious || 0);

const hours = computed(() => Math.floor(dtp.value / 60));
const minutes = computed(() => Math.floor(dtp.value % 60));
const hoursDecimal = computed(() => (dtp.value / 60).toFixed(2));

const HHMM = computed(() => {
  const h = hours.value;
  const m = `0${minutes.value}`.slice(-2);
  return `${h}:${m}`;
});
</script>
