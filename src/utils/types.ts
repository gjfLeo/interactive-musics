export interface IMAlbum {
  title: string;
  titleEn: string;
  image?: string;
  musics: IMMusic[];
}

export interface IMMusic {
  subtitle?: string;
  tracks: IMTrack[];
}

export interface IMTrack {
  scene: string;
  title: string;
  titleEn: string;
  start: number;
  links: {
    ne?: number;
    qq?: string;
    fandom?: string;
  };
  credits?: string[][];
  note?: string;
}
