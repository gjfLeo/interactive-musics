import type { IMTrack } from "./types";

export function getTrackSrc(links: IMTrack["links"]) {
  return `https://music.163.com/song/media/outer/url?id=${links.ne}`;
}

export function getTrackUrlNe(ne: IMTrack["links"]["ne"]) {
  return `https://music.163.com/#/song?id=${ne}`;
}

export function getTrackUrlQq(qq: IMTrack["links"]["qq"]) {
  return `https://y.qq.com/n/ryqq/songDetail/${qq}`;
}
