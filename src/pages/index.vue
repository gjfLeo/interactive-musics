<template>
  <div flex="~ col gap-4">
    <NTreeSelect
      v-model:value="store.musicKey"
      :options="options"
      :override-default-node-click-behavior="handleNodeClick"
      :render-prefix="handleRenderPrefix"
      :render-label="handleRenderLabel"
      :render-suffix="handleRenderSuffix"
      @update:value="store.scene = ''"
    />
    <InteractiveMusic v-if="music" v-bind="music" />
  </div>
</template>

<script setup lang="ts">
import type { TreeSelectOption, TreeSelectOverrideNodeClickBehavior, TreeSelectRenderLabel, TreeSelectRenderPrefix, TreeSelectRenderSuffix } from "naive-ui";
import { NIcon, NImage, NText } from "naive-ui";
import albums from "@/utils/albums";
import type { IMAlbum, IMMusic } from "@/utils/types";
import useStore from "@/stores/main";

const store = useStore();
const music = computed(() => albums.flatMap(album => album.musics).find(music => music.tracks[0].title === store.musicKey));

const options: TreeSelectOption[] = albums.map((album) => {
  const { musics, ...albumInfo } = album;
  return {
    key: album.title,
    label: album.title,
    children: musics.map((music) => {
      return {
        key: music.tracks[0].title,
        label: music.tracks.map(track => track.title).join(" / "),
        value: music.tracks[0].title,
        music,
      };
    }),
    album: albumInfo,
  };
});

const handleNodeClick: TreeSelectOverrideNodeClickBehavior = ({ option }) => {
  if (option.children) {
    return "toggleExpand";
  }
  return "default";
};
const handleRenderPrefix: TreeSelectRenderPrefix = ({ option }) => {
  if (option.music) {
    return h(NIcon, { class: "text-lg" }, () => h("div", { class: "i-carbon:music" }));
  }
  if (option.album) {
    const album = option.album as IMAlbum;
    if (album.image) {
      return h(NImage, {
        class: "w-12 h-12",
        previewDisabled: true,
        src: `${album.image}?param=100y100`,
        alt: album.title,
      });
    }
    return album.title;
  }
};
const handleRenderLabel: TreeSelectRenderLabel = ({ option }) => {
  if (option.music) {
    return h(
      "div",
      {
        class: "flex flex-col p-block-1",
      },
      [
        h(NText, () => (option.music as IMMusic).tracks.map(track => track.title).join(" / ")),
        // h(NText, { class: "text-xs", depth: 3 }, () => (option.music as IMMusic).tracks.map(track => track.titleEn).join(" / ")),
      ],
    );
  }
  if (option.album) {
    const album = option.album as IMAlbum;
    return h(
      "div",
      {
        class: "flex flex-col",
      },
      [
        h(NText, () => album.title),
        h(NText, { class: "text-xs", depth: 3 }, () => album.titleEn),
      ],
    );
  }
};
const handleRenderSuffix: TreeSelectRenderSuffix = ({ option }) => {
  if (option.music) {
    const music = option.music as IMMusic;
    if (music.subtitle) {
      return h(NText, { class: "text-xs", depth: 3 }, () => music.subtitle);
    }
  }
};
</script>
