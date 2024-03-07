<template>
  <NButton circle @click="playing = !playing">
    <template #icon>
      <div :class="playing ? 'i-carbon:pause' : 'i-carbon:play'" />
    </template>
  </NButton>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();

const { modelValue: playing } = useVModels(props, emit);
</script>
