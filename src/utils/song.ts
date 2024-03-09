import md5 from "crypto-js/md5";
import type { IMTrack } from "./types";

export function getTrackSrc(links: IMTrack["links"]) {
  if (links.ne) {
    return `https://music.163.com/song/media/outer/url?id=${links.ne}`;
  }
  if (links.fandom) {
    let filename = links.fandom as string;
    filename = filename.replace(":", "");
    filename = filename.replaceAll(" ", "_");
    const hash = md5(filename).toString();
    filename = filename.replace("'", "%27");
    return `https://static.wikia.nocookie.net/gensin-impact/images/${hash.charAt(0)}/${hash.slice(0, 2)}/${filename}`;
  }
  throw new Error("没有可用的音频资源");
}

export function getTrackUrlNe(ne: IMTrack["links"]["ne"]) {
  return `https://music.163.com/#/song?id=${ne}`;
}

export function getTrackUrlQq(qq: IMTrack["links"]["qq"]) {
  return `https://y.qq.com/n/ryqq/songDetail/${qq}`;
}
