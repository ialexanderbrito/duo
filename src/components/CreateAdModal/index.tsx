import { useEffect, useState } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CaretDown, Check, GameController } from 'phosphor-react';

import { Input } from 'components/Input';

import { useToast } from 'contexts/Toast';

import { useCreateAd } from 'hooks/useCreateAd';

import { getGames } from 'services/get/games';

interface Game {
  id: number;
  title: string;
}

export function CreateAdModal() {
  const { toast } = useToast();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function loadGames() {
      try {
        const { data } = await getGames();
        setGames(data);
      } catch (error) {
        toast.error('Erro ao carregar jogos');
      }
    }

    loadGames();
  }, []);

  const { formCreateAd } = useCreateAd();

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            formCreateAd.handleSubmit(e);
          }}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <Select.Root
              name="game"
              onValueChange={(value) => {
                formCreateAd.setFieldValue('game', value);
              }}
            >
              <Select.Trigger
                className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between items-center [&[data-placeholder]]:text-zinc-500"
                name="game"
                value={formCreateAd.values.game}
                onChange={(e) => formCreateAd.setFieldValue('game', e)}
              >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal className="bg-zinc-900 py-3 px-4 rounded text-sm text-white cursor-pointer">
                <Select.Content>
                  <Select.Viewport>
                    {games.map((game) => (
                      <Select.Group key={game.id}>
                        <Select.Item
                          value={String(game.id)}
                          className="flex relative items-center hover:bg-violet-500 rounded h-6 p-2"
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                        </Select.Item>
                      </Select.Group>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              value={formCreateAd.values.name}
              onChange={formCreateAd.handleChange}
              placeholder="Como te chamam dentro do game?"
            />
            {formCreateAd.errors.name && (
              <p className="text-red-500 text-xs">{formCreateAd.errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                value={formCreateAd.values.yearsPlaying}
                onChange={formCreateAd.handleChange}
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
              {formCreateAd.errors.yearsPlaying && (
                <p className="text-red-500 text-xs">
                  {formCreateAd.errors.yearsPlaying}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input
                value={formCreateAd.values.discord}
                onChange={formCreateAd.handleChange}
                id="discord"
                name="discord"
                type="text"
                placeholder="username#0000"
              />
              {formCreateAd.errors.discord && (
                <p className="text-red-500 text-xs">
                  {formCreateAd.errors.discord}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={formCreateAd.values.weekDays}
                onValueChange={(value) => {
                  formCreateAd.setFieldValue('weekDays', value);
                }}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${
                    formCreateAd.values.weekDays.includes('0')
                      ? 'bg-violet-500'
                      : 'bg-zinc-900'
                  }`}
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${
                    formCreateAd.values.weekDays.includes('1')
                      ? 'bg-violet-500'
                      : 'bg-zinc-900'
                  }`}
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${
                    formCreateAd.values.weekDays.includes('2')
                      ? 'bg-violet-500'
                      : 'bg-zinc-900'
                  }`}
                >
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${
                    formCreateAd.values.weekDays.includes('3')
                      ? 'bg-violet-500'
                      : 'bg-zinc-900'
                  }`}
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${
                    formCreateAd.values.weekDays.includes('4')
                      ? 'bg-violet-500'
                      : 'bg-zinc-900'
                  }`}
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${
                    formCreateAd.values.weekDays.includes('5')
                      ? 'bg-violet-500'
                      : 'bg-zinc-900'
                  }`}
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${
                    formCreateAd.values.weekDays.includes('6')
                      ? 'bg-violet-500'
                      : 'bg-zinc-900'
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={formCreateAd.values.hourStart}
                  onChange={formCreateAd.handleChange}
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  value={formCreateAd.values.hourEnd}
                  onChange={formCreateAd.handleChange}
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={formCreateAd.values.voiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  formCreateAd.setFieldValue('voiceChannel', true);
                } else {
                  formCreateAd.setFieldValue('voiceChannel', false);
                }
              }}
              className="w-6 h-6 p-1 rounded-sm bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
