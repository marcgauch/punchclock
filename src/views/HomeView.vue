<template>
  <el-row :gutter="12">
    <el-col :lg="4">
      <ThePunchclock />
    </el-col>
    <el-col :lg="12">
      <TheHistory />
    </el-col>
    <el-col :lg="8">
      <TheSummary />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ThePunchclock from "@/components/ThePunchclock.vue";
import TheHistory from "@/components/history/TheHistory.vue";
import TheSummary from "@/components/TheSummary.vue";
</script>
