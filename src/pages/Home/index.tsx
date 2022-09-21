import { useEffect, useState } from 'react';

import { LeapFrog } from '@uiball/loaders';
import logoImg from 'assets/logo-esports.svg';
import { useKeenSlider } from 'keen-slider/react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { CreateAdBanner } from 'components/CreateAdBanner';
import { GameBanner } from 'components/GameBanner';

import { useToast } from 'contexts/Toast';

import { getGames } from 'services/get/games';

interface Game {
  id: number;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function Homepage() {
  const { toast } = useToast();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    dragSpeed: 3,
    loop: true,
    slides: {
      perView: 2,
      spacing: 12,
    },
    breakpoints: {
      '(min-width: 425px)': {
        slides: {
          perView: 2,
          spacing: 18,
        },
      },
      '(min-width: 640px)': {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
      '(min-width: 768px)': {
        slides: {
          perView: 4,
          spacing: 18,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 5,
          spacing: 20,
        },
      },
      '(min-width: 1280px)': {
        slides: {
          perView: 6,
          spacing: 24,
        },
      },
    },
  });

  useEffect(() => {
    async function loadGames() {
      try {
        const { data } = await getGames();
        setGames(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar jogos');
      } finally {
        setIsLoading(false);
      }
    }

    loadGames();
  }, []);

  return (
    <>
      <div className="mx-auto my-10 flex max-w-[1344px] flex-col items-center px-4 sm:my-14 md:my-16 xl:my-20">
        <img src={logoImg} alt="eSports" />

        <h1 className="mt-10 text-3xl font-black text-white sm:mt-14 md:mt-16 md:text-4xl lg:text-5xl xl:mt-20 xl:text-6xl">
          Seu{' '}
          <span className="bg-nlw-gradient bg-clip-text text-transparent">
            duo
          </span>{' '}
          está aqui
        </h1>

        {isLoading ? (
          <div className="flex  mt-16 mb--16">
            <LeapFrog color="#9572fc" />
          </div>
        ) : (
          <>
            <div className="mt-16 flex w-full items-center justify-between gap-6">
              <button
                type="button"
                className="aspect-square w-6 text-zinc-400 hover:text-zinc-500 sm:w-8 md:w-10 lg:w-12"
                onClick={() => {
                  instanceRef.current?.prev();
                }}
              >
                <CaretLeft className="transition-colors w-full h-full" />
              </button>

              <div className="w-full max-w-[1200px] overflow-hidden">
                <div ref={sliderRef} className="keen-slider">
                  {games.map((game) => (
                    <GameBanner
                      key={game.id}
                      id={String(game.id)}
                      title={game.title}
                      bannerUrl={game.bannerUrl}
                      adsCount={game._count.ads}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="aspect-square w-6 text-zinc-400 hover:text-zinc-500 sm:w-8 md:w-10 lg:w-12"
                onClick={() => {
                  instanceRef.current?.next();
                }}
              >
                <CaretRight className="transition-colors w-full h-full" />
              </button>
            </div>

            <CreateAdBanner />
          </>
        )}
      </div>
    </>
  );
}
