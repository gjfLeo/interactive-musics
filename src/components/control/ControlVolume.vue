<template>
  <NPopover trigger="hover" :show-arrow="false" width="trigger" placement="top">
    <template #trigger>
      <NButton circle @click="toggleMute">
        <template #icon>
          <div :class="volume === 0 ? 'i-carbon:volume-mute' : volume < 0.4 ? 'i-carbon:volume-down' : 'i-carbon:volume-up'" />
        </template>
      </NButton>
    </template>
    <template #default>
      <div class="h-30 flex flex-col items-center justify-center gap-1" style="margin: 0 -10px;">
        <NSlider v-model:value="volume" :min="0" :max="1" :step="0.01" vertical :tooltip="false" />
        <NText class="text-sm">{{ displayValue }}</NText>
      </div>
    </template>
  </NPopover>
</template>

<script lang="ts" setup>
import { TransitionPresets, executeTransition } from "@vueuse/core";

const props = defineProps<{
  modelValue: number;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: number): void;
}>();

const { modelValue: volume } = useVModels(props, emit);

const cachedVolume = ref(volume.value);
const displayValue = computed(() => (volume.value * 100).toFixed(0));

function setVolumeTransition(value: number) {
  return executeTransition(volume, volume.value, value, {
    duration: 500 * Math.abs(volume.value - value),
    transition: TransitionPresets.linear,
  });
}

function toggleMute() {
  if (volume.value === 0) {
    setVolumeTransition(cachedVolume.value);
  }
  else {
    cachedVolume.value = volume.value;
    setVolumeTransition(0);
  }
}
</script>
