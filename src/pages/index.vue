<template>
  <div flex="~ col gap-4">
    <NTreeSelect
      v-model:value="store.musicKey"
      :options="options"
      :override-default-node-click-behavior="handleNodeClick"
      :render-label="handleRenderLabel"
      @update:value="store.scene = ''"
    />
    <InteractiveMusic v-if="music" v-bind="music" />
  </div>
</template>

<script setup lang="ts">
import type { TreeSelectOption, TreeSelectOverrideNodeClickBehavior, TreeSelectRenderLabel } from "naive-ui";
import { NText } from "naive-ui";
import albums from "@/utils/albums";
import type { IMMusic } from "@/utils/types";
import useStore from "@/stores/main";

const store = useStore();
const music = computed(() => albums.flatMap(album => album.musics).find(music => music.tracks[0].title === store.musicKey));

const options: TreeSelectOption[] = albums.map((album) => {
  return {
    key: album.title,
    label: album.title,
    titleEn: album.titleEn,
    children: album.musics.map((music) => {
      return {
        key: music.tracks[0].title,
        label: music.tracks.map(track => track.title).join(" / "),
        value: music.tracks[0].title,
        music,
      };
    }),
  };
});

const handleNodeClick: TreeSelectOverrideNodeClickBehavior = ({ option }) => {
  if (option.children) {
    return "toggleExpand";
  }
  return "default";
};
const handleRenderLabel: TreeSelectRenderLabel = ({ option }) => {
  if (option.music) {
    return h(
      "div",
      {
        class: "flex flex-col",
      },
      [
        h(NText, () => (option.music as IMMusic).tracks.map(track => track.title).join(" / ")),
        h(NText, { class: "text-xs", depth: 3 }, () => (option.music as IMMusic).tracks.map(track => track.titleEn).join(" / ")),
      ],
    );
  }
  else {
    return h(
      "div",
      {
        class: "flex flex-col",
      },
      [
        h(NText, () => option.label),
        h(NText, { class: "text-xs", depth: 3 }, () => option.titleEn),
      ],
    );
  }
};
</script>
