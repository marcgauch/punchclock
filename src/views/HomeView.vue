<template>
  <el-row :gutter="12">
    <el-col :lg="4">
      <ThePunchclock />
    </el-col>
    <el-col :lg="20">
      <TheInfos />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ThePunchclock from "@/components/ThePunchclock.vue";
import TheInfos from "@/components/TheInfos.vue";
</script>
