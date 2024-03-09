<template>
  <div flex="~ gap-2">
    <a :href="getTrackUrlNe(links.ne)">
      <img
        class="h-6 w-6"
        src="//s1.music.126.net/style/favicon.ico"
      />
    </a>
    <a v-if="links.qq" :href="getTrackUrlQq(links.qq)">
      <img
        class="h-6 w-6"
        src="//y.qq.com/favicon.ico"
      />
    </a>
  </div>
</template>

<script lang="ts" setup>
import { getTrackUrlNe, getTrackUrlQq } from "@/utils/song";
import type { IMTrack } from "@/utils/types";

defineProps<{
  links: IMTrack["links"];
}>();
</script>
