<template>
  <el-card>
    <template #header> History </template>
    <el-table :data="entries">
      <el-table-column prop="type" label="Type" width="180" />
      <el-table-column prop="date.ISO" label="Date" width="180" />
      <el-table-column label="Time" width="180">
        <template #default="scope">
          {{ scope.row.date.fullHour }}:{{ scope.row.date.fullMinute }}
        </template>
      </el-table-column>
      <el-table-column label="Duration">
        <template #default="scope">
          <DurationEntry
            :differenceToPrevious="scope.row.date.differenceToPrevious"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventsStore } from "@/stores/events";
import DurationEntry from "./DurationEntry.vue";
const eventStore = useEventsStore();
const entries = computed(() => eventStore.getEntriesForDate);
</script>
