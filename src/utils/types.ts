export interface InteractiveMusicInfo {
  tracks: IMTrack[];
}

export interface IMTrack {
  scene: string;
  title: string;
  titleEn?: string;
  src: string;
  start: number;
}
