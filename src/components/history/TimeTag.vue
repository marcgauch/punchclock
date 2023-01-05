<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="`Click to get '${clipboardValue}' in your clipboard`"
    placement="top"
  >
    <el-tag @click="copyToClipboard">
      {{ displayValue }}
    </el-tag>
  </el-tooltip>
</template>

<script setup lang="ts">
const props = defineProps<{
  displayValue: string | number;
  clipboardValue?: string | number;
}>();

const clipboardValue =
  props.clipboardValue?.toString() ?? props.displayValue.toString();

const copyToClipboard = () => {
  navigator.clipboard.writeText(clipboardValue);
};
</script>
