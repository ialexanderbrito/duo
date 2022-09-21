export interface Ads {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
}
