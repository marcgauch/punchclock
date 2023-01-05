<template>
  <el-card>
    <template #header> History </template>
    <HistoryEntry
      v-for="entry in entries"
      :entry-id="entry.id"
      :key="entry.id"
    />
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventsStore } from "@/stores/events";
import HistoryEntry from "./HistoryEntry.vue";
import { DateTimeFragmentedUtil } from "@/models/models";
const eventStore = useEventsStore();
const today = DateTimeFragmentedUtil.createWithNow().ISO;
const entries = computed(() => eventStore.getEntriesForDate(today));
</script>
