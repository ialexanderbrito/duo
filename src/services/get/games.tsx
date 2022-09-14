import { api } from 'services/api';

export async function getGames() {
  const { data } = await api.get(`/games`);

  return { data };
}
