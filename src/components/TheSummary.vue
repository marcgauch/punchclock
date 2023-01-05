<template>
  <el-card>
    <template #header> Summary </template>
    <el-row v-if="total !== null">
      <el-col :span="8">
        <el-tag>{{ total }} min </el-tag>
      </el-col>
      <el-col :span="8">
        <el-tag> {{ Math.floor(total / 60) }} hrs {{ total % 60 }} min </el-tag>
      </el-col>
      <el-col :span="8">
        <el-tag>
          {{ (total / 60).toFixed(2) }}
          hours
        </el-tag>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventsStore } from "@/stores/events";
const eventStore = useEventsStore();
const total = computed(() => eventStore.getTotalTime);
</script>
