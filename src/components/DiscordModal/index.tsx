import * as Dialog from '@radix-ui/react-dialog';
import { LeapFrog } from '@uiball/loaders';
import { CheckCircle } from 'phosphor-react';

import { useToast } from 'contexts/Toast';

interface DiscordModalProps {
  discord: string;
  loading: boolean;
}

export function DiscordModal(props: DiscordModalProps) {
  const { toast } = useToast();

  function copyToClipboard(discord: string) {
    navigator.clipboard.writeText(discord);
    toast.success(`Copiado ${discord} para a área de transferência`, {
      id: 'discord',
    });
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2a2634] top-1/2 left-1/2 max-h-screen w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm py-8 px-10 text-white shadow-lg shadow-black/25 sm:rounded-lg">
        <Dialog.Title className="items-center flex justify-center sm:text-2xl md:text-3xl">
          <CheckCircle size={64} className="text-emerald-400" />
        </Dialog.Title>

        <div className="items-center flex justify-center flex-col mb-6">
          <h1 className="font-black sm:text-2xl md:text-3xl">Let's play!</h1>
          <p className="text-zinc-400">Agora é só começar a jogar!</p>
        </div>

        <div className="items-center flex justify-center flex-col mb-6">
          <h2 className="font-semibold mb-2">Adicione no Discord</h2>

          <div
            className="flex items-center justify-center bg-zinc-900 w-56 h-12 rounded gap-8 cursor-pointer hover:bg-zinc-800"
            onClick={() => {
              copyToClipboard(props.discord);
            }}
          >
            {props.loading ? (
              <LeapFrog color="#9572fc" size={16} />
            ) : (
              <p className="text-zinc-200">{props.discord}</p>
            )}
          </div>
        </div>

        <footer className="mt-4 flex justify-center gap-4">
          <Dialog.Close className="rounded-md bg-zinc-500 py-2.5 px-3.5 text-sm font-semibold transition-colors hover:bg-zinc-600 sm:px-5 sm:py-3 sm:text-base">
            Cancelar
          </Dialog.Close>
        </footer>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
