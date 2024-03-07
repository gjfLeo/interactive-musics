<template>
  <div>
    <audio
      v-for="track in tracks" :key="track.scene"
      ref="audios"
      :data-scene="track.scene"
      :src="track.src"
    />
  </div>
  <div class="flex flex-col gap-4">
    <div>
      <NRadioGroup v-model:value="currentScene">
        <NRadioButton
          v-for="track in tracks" :key="track.scene"
          :value="track.scene" :label="track.scene"
        />
      </NRadioGroup>
    </div>
    <div>
      <NRadioGroup v-model:value="currentScene">
        <NRadioButton
          v-for="track in tracks" :key="track.scene"
          :value="track.scene" :label="track.scene"
        />
      </NRadioGroup>
    </div>
    <div>
      <NRadioGroup v-model:value="currentScene">
        <NRadioButton
          v-for="track in tracks" :key="track.scene"
          :value="track.scene" :label="track.scene"
        />
      </NRadioGroup>
    </div>
    <div>
      <NRadioGroup v-model:value="currentScene">
        <NRadioButton
          v-for="track in tracks" :key="track.scene"
          :value="track.scene" :label="track.scene"
        />
      </NRadioGroup>
    </div>
    <div flex="~ gap-4 items-center">
      <ControlPlaying v-model="playing" />
      <ControlVolume v-model="volume" />
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

const { playing, currentScene, currentTime, endTime, volume } = useInteractiveMusicControls(props, audios);

volume.value = 0.5;
</script>
