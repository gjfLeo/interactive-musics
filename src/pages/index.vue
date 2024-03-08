<template>
  <NTreeSelect
    :options="options"
    :override-default-node-click-behavior="handleNodeClick"
    :render-label="handleRenderLabel"
    @update:value="handleSelect"
  />
  <InteractiveMusic v-bind="music" />
</template>

<script setup lang="ts">
import type { TreeSelectOption, TreeSelectOverrideNodeClickBehavior, TreeSelectRenderLabel } from "naive-ui";
import { NText } from "naive-ui";
import albums from "@/utils/albums";
import type { IMMusic } from "@/utils/types";

const options: TreeSelectOption[] = albums.map((album) => {
  return {
    key: album.title,
    label: album.title,
    titleEn: album.titleEn,
    children: album.musics.map((music) => {
      const title = music.tracks.map(track => track.title).join("\u2006/\u2006");
      return {
        key: title,
        label: title,
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
        h(NText, () => (option.music as IMMusic).tracks.map(track => track.title).join("\u2006/\u2006")),
        h(NText, { class: "text-xs", depth: 3 }, () => (option.music as IMMusic).tracks.map(track => track.titleEn).join("\u2006/\u2006")),
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

const music = ref(albums[0].musics[0]);
function handleSelect(key: string, option: TreeSelectOption) {
  if (option.music) {
    music.value = option.music as IMMusic;
  }
}
</script>
