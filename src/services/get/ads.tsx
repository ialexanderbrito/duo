import { api } from 'services/api';

export async function getAdsGames(id: string) {
  const { data } = await api.get(`/games/${id}/ads`);

  return { data };
}
