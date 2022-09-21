import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LeapFrog } from '@uiball/loaders';
import logoImg from 'assets/logo-esports.svg';
import { Ads, Game } from 'interfaces/GameAd';
import { useKeenSlider } from 'keen-slider/react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { UserBanner } from 'components/UserBanner';

import { useToast } from 'contexts/Toast';

import { getAdsGames } from 'services/get/ads';
import { getGameId } from 'services/get/games';

export function GamedAd() {
  const { id } = useParams();

  const { toast } = useToast();

  const [ads, setAds] = useState<Ads[]>([]);
  const [game, setGame] = useState<Game>({} as Game);
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
          perView: 1,
          spacing: 18,
        },
      },
      '(min-width: 640px)': {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 18,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
      '(min-width: 1280px)': {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
    },
  });

  useEffect(() => {
    async function getGame() {
      try {
        const { data } = await getGameId(id as string);

        setGame(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar jogo');
      } finally {
        setIsLoading(false);
      }
    }

    getGame();
  }, []);

  useEffect(() => {
    async function loadAdsGame() {
      try {
        const { data } = await getAdsGames(id as string);
        setAds(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar duos');
      } finally {
        setIsLoading(false);
      }
    }

    loadAdsGame();
  }, []);

  return (
    <>
      <div className="mx-auto my-10 flex max-w-[1344px] flex-col items-center px-4 sm:my-14 md:my-16 xl:my-20">
        <Link to="/">
          <img src={logoImg} alt="eSports" className="w-32 mb-6 sm:w-full" />
        </Link>

        <img
          src={game.bannerUrl}
          alt={game.title}
          className="w-2/4 h-72 bg-cover object-cover rounded-lg"
        />

        <h1 className="text-white font-black text-5xl mt-3 w-2/4 ">
          {game.title}
        </h1>
        <p className="w-2/4 text-zinc-400">Conecte-se e comece a jogar!</p>

        {isLoading && (
          <div className="flex  mt-16 mb--16">
            <LeapFrog color="#9572fc" />
          </div>
        )}

        {ads.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-6">
            <h1 className="text-white font-black text-3xl mt-3 sm:text-5xl">
              Nenhum duo encontrado
            </h1>
            <p className="w-full text-zinc-400">Tente novamente mais tarde</p>
          </div>
        )}

        {ads.length > 0 && (
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
                  {ads.map((ad) => (
                    <UserBanner
                      key={ad.id}
                      id={ad.id}
                      name={ad.name}
                      weekDays={ad.weekDays}
                      useVoiceChannel={ad.useVoiceChannel}
                      yearsPlaying={ad.yearsPlaying}
                      hourStart={ad.hourStart}
                      hourEnd={ad.hourEnd}
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
          </>
        )}
      </div>
    </>
  );
}
