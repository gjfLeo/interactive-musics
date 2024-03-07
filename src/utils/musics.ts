import { getSongUrl } from "./song";
import type { InteractiveMusicInfo } from "./types";

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
} satisfies InteractiveMusicInfo;
