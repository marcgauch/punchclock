<template>
  <el-card>
    <template #header>
      Entries for&nbsp;
      <el-date-picker
        value-format="YYYY-MM-DD"
        v-model="date"
        @change="preventEmpty()"
        :clear-icon="RefreshLeft"
      />
    </template>
    <el-row :gutter="12">
      <el-col :lg="16">
        <TheHistory />
      </el-col>
      <el-col :lg="8">
        <TheSummary />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import TheHistory from "@/components/history/TheHistory.vue";
import TheSummary from "@/components/TheSummary.vue";
import Util from "@/util/util";
import { RefreshLeft } from "@element-plus/icons-vue";
import { ref } from "vue";

import { useEventsStore } from "@/stores/events";
const eventStore = useEventsStore();

const date = ref(Util.formatToYYYYMMDD(new Date()));

const preventEmpty = () => {
  if (!date.value) {
    date.value = Util.formatToYYYYMMDD(new Date());
  }
  eventStore.date = date.value;
};
</script>
