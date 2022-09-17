import { api } from 'services/api';

export interface PayloadProps {
  name: string;
  discord: string;
  yearsPlaying: number;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

export async function createAd(
  payload: PayloadProps,
  game: string,
): Promise<{ data: PayloadProps }> {
  const { data } = await api.post(`/games/${game}/ads`, payload);

  return { data };
}
