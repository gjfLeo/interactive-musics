<template>
  <div class="hidden">
    <audio
      v-for="track in tracks" :key="track.scene"
      ref="audios"
      :data-scene="track.scene"
    />
  </div>
  <div flex="~ col gap-4">
    <div flex="~ gap-4 items-center">
      <ControlPlaying v-model="playing" />
      <ControlVolume v-model="volume" />
      <NSlider v-model:value="currentTime" :max="endTime" :step="0.01" :tooltip="false" />
      <NText class="shrink-0"><NTime :time="currentTime * 1000" format="mm:ss" />&#x2006;/&#x2006;<NTime :time="endTime * 1000" format="mm:ss" /></NText>
    </div>
    <NTabs v-model:value="scene" type="line" placement="left" animated>
      <NTabPane
        v-for="track in tracks" :key="track.scene"
        :name="track.scene" :tab="track.scene"
        style="--n-pane-padding-top: 0"
      >
        <NCard class="min-h-full">
          <template #header>
            <div flex="~ col ">
              <NText class="text-lg">{{ track.title }}</NText>
              <NText class="text-sm" :depth="3">{{ track.titleEn }}</NText>
            </div>
          </template>
          <template #header-extra>
            <TrackLinks :links="track.links" />
          </template>
          <template #default>
            <TrackCredits v-if="track.credits" :credits="track.credits" />
          </template>
        </NCard>
      </NTabPane>
    </NTabs>
  </div>
  <!-- <div class="grid" style="grid-template-columns: repeat(4, 1fr);">
    <pre>{{ { playing, currentTime, endTime } }}</pre>
    <pre v-for="(c, i) in trackControls" :key="i">{{ c }}</pre>
  </div> -->
</template>

<script setup lang="ts">
import { useInteractiveMusicControls } from "@/composables/interactive-music-controls";
import type { IMMusic } from "@/utils/types";

const props = defineProps<IMMusic>();

const audios = ref<HTMLAudioElement[]>([]);

const { playing, scene, currentTime, endTime, volume } = useInteractiveMusicControls(props, audios);

volume.value = 0.5;
</script>
