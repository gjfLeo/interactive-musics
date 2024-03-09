export interface IMAlbum {
  title: string;
  titleEn: string;
  musics: IMMusic[];
}

export interface IMMusic {
  tracks: IMTrack[];
}

export interface IMTrack {
  scene: string;
  title: string;
  titleEn: string;
  start: number;
  credits?: string[][];
  links: {
    ne: number;
    qq?: string;
  };
  note?: string;
}
