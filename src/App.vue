<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useEventsStore } from "@/stores/events";
const eventStore = useEventsStore();
eventStore.loadFromStorage();
</script>

<style>
html,
body {
  width: 99vw;
  margin: 0;
}
</style>
