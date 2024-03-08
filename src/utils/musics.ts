import { getSongUrl } from "./song";
import type { IMMusic } from "./types";

export const StoriesOfRemoteAntiquity = {
  tracks: [
    {
      scene: "探索",
      title: "深埋地心的瑰秘",
      titleEn: "Stories of Remote Antiquity",
      src: getSongUrl(1956543019),
      start: 0.23,
    },
    {
      scene: "战斗",
      title: "激扬的韧战",
      titleEn: "Inevitable Conflict",
      src: getSongUrl(1956543025),
      start: 0,
    },
  ],
} satisfies IMMusic;

export const DecayedInTheDarkness = {
  tracks: [
    {
      scene: "探索1",
      title: "繁华已逝",
      titleEn: "Decayed in the Darkness",
      src: getSongUrl(1956543015),
      start: 0,
    },
    {
      scene: "探索2",
      title: "破碎的荣耀",
      titleEn: "A Shard From Past Glories",
      src: getSongUrl(1956543016),
      start: 0.1,
    },
    {
      scene: "战斗",
      title: "腾溢的敌意",
      titleEn: "Seething Animosity",
      src: getSongUrl(1956543022),
      start: 0,
    },
  ],
} satisfies IMMusic;
