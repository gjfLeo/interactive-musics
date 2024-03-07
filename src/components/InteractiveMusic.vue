<template>
  <div>
    <audio
      v-for="track in tracks" :key="track.scene"
      ref="audios"
      :data-scene="track.scene"
      :src="track.src"
    />
  </div>
  <div flex="~ items-center gap-4">
    <NButton circle @click="playing = !playing">
      <template #icon>
        <div :class="playing ? 'i-carbon:pause' : 'i-carbon:play'" />
      </template>
    </NButton>
    <NRadioGroup v-model:value="currentScene">
      <NRadioButton
        v-for="track in tracks" :key="track.scene"
        :value="track.scene" :label="track.scene"
      />
    </NRadioGroup>
    <div class="w-full">
      <NSlider v-model:value="currentTime" :max="endTime" :step="0.01" />
    </div>
  </div>
  <!-- <div class="grid" style="grid-template-columns: repeat(4, 1fr);">
    <pre>{{ { mainPlaying, mainCurrentTime, endTime } }}</pre>
    <pre v-for="(c, i) in controls" :key="i">{{ c }}</pre>
  </div> -->
</template>

<script setup lang="ts">
import { useInteractiveMusicControls } from "@/composables/interactive-music-controls";
import type { InteractiveMusicInfo } from "@/utils/types";

const props = defineProps<InteractiveMusicInfo>();

const audios = ref<HTMLAudioElement[]>([]);

const { playing, currentScene, currentTime, endTime } = useInteractiveMusicControls(props, audios);
</script>
