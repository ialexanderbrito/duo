import { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';

import { DiscordModal } from 'components/DiscordModal';

import { useToast } from 'contexts/Toast';

import { getDiscordId } from 'services/get/games';

interface UserBannerProps {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

export function UserBanner(props: UserBannerProps) {
  const { toast } = useToast();

  const [discord, setDiscord] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function loadDiscord(id: string) {
    try {
      const { data } = await getDiscordId(id);

      setDiscord(data.discord);

      setIsLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar o Discord');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog.Root>
      <div className="keen-slider__slide flex flex-col bg-[#2A2634] w-72 h-96 relative rounded-lg overflow-hidden flex-shrink-0 p-8">
        <div className="mb-4">
          <p className="text-zinc-500">Nome</p>

          <strong className="text-white">{props.name}</strong>
        </div>

        <div className="mb-4">
          <p className="text-zinc-500">Tempo de jogo</p>

          <strong className="text-white">{props.yearsPlaying} ano(s)</strong>
        </div>

        <div className="mb-4">
          <p className="text-zinc-500">Disponibilidade</p>

          <strong className="text-white">
            {props.weekDays.length} dias・{props.hourStart}h - {props.hourEnd}h
          </strong>
        </div>

        <div className="mb-4">
          <p className="text-zinc-500">Chamada de áudio?</p>

          <strong
            className={
              props.useVoiceChannel ? 'text-emerald-500' : 'text-red-500'
            }
          >
            {props.useVoiceChannel ? 'Sim' : 'Não'}
          </strong>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <Dialog.Trigger
            className="bg-violet-500 w-full px-5 h-12 justify-center rounded-md font-semibold flex items-center gap-3 text-white hover:bg-violet-600"
            onClick={() => {
              loadDiscord(props.id);
            }}
          >
            <GameController size={24} />
            Conectar
          </Dialog.Trigger>
        </div>
      </div>

      <DiscordModal discord={discord} loading={isLoading} />
    </Dialog.Root>
  );
}
