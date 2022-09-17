import { api } from 'services/api';

export async function getGames() {
  const { data } = await api.get(`/games`);

  return { data };
}

export async function getGameId(id: string) {
  const { data } = await api.get(`/game/${id}`);

  return { data };
}
