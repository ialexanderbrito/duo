import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LeapFrog } from '@uiball/loaders';
import logoImg from 'assets/logo-esports.svg';
import { useKeenSlider } from 'keen-slider/react';
import { ArrowLeft } from 'phosphor-react';

import { Arrow } from 'components/Arrow';
import { UserBanner } from 'components/UserBanner';

import { useToast } from 'contexts/Toast';

import { getAdsGames } from 'services/get/ads';
import { getGameId } from 'services/get/games';

interface Ads {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
}

export function GamedAd() {
  const { id } = useParams();

  const { toast } = useToast();

  const [ads, setAds] = useState<Ads[]>([]);
  const [game, setGame] = useState<Game>({} as Game);
  const [isLoading, setIsLoading] = useState(true);

  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: {
      perView: 2,
      spacing: 12,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const sliderOptions = {
    initial: 0,
    loop: true,
    slides: {
      perView: 2,
      spacing: 12,
    },
  };

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions,
    });
  }, [instanceRef, sliderOptions]);

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
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center justify-between w-2/4 mb-4 ">
          <Link to="/">
            <ArrowLeft
              className="text-white hover:text-violet-500 "
              size={36}
            />
          </Link>
          <div className="w-full  items-center flex justify-center">
            <Link to="/">
              <img src={logoImg} alt="eSports" className="w-48" />
            </Link>
          </div>
        </div>
        <img
          src={game.bannerUrl}
          alt={game.title}
          className="w-2/4 h-72 bg-cover object-cover rounded-lg"
        />

        <h1 className="text-white font-black text-5xl mt-3 w-2/4">
          {game.title}
        </h1>
        <p className="w-2/4 text-zinc-400">Conecte-se e comece a jogar!</p>

        {isLoading && (
          <div className="flex  mt-16 mb--16">
            <LeapFrog color="#9572fc" />
          </div>
        )}

        {ads.length > 0 && (
          <div className="navigation-wrapper w-2/4 mt-8">
            <div ref={sliderRef} className="keen-slider">
              {ads.map((ad) => (
                <UserBanner
                  key={ad.id}
                  name={ad.name}
                  weekDays={ad.weekDays}
                  useVoiceChannel={ad.useVoiceChannel}
                  yearsPlaying={ad.yearsPlaying}
                  hourStart={ad.hourStart}
                  hourEnd={ad.hourEnd}
                />
              ))}
            </div>
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef?.current?.track?.details?.slides?.length - 1
                  }
                />
              </>
            )}
          </div>
        )}

        {ads.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-6">
            <h1 className="text-white font-black text-5xl mt-3 ">
              Nenhum duo encontrado
            </h1>
            <p className="w-2/4 text-zinc-400">Tente novamente mais tarde</p>
          </div>
        )}
      </div>
    </>
  );
}
