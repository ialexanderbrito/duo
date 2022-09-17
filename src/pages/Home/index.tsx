import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { LeapFrog } from '@uiball/loaders';
import logoImg from 'assets/logo-esports.svg';
import { useKeenSlider } from 'keen-slider/react';

import { Arrow } from 'components/Arrow';
import { CreateAdBanner } from 'components/CreateAdBanner';
import { CreateAdModal } from 'components/CreateAdModal';
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

  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: {
      perView: 6,
      spacing: 8,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const sliderOptions = {
    loop: true,
    slides: {
      perView: 6,
      spacing: 8,
    },
  };

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions,
    });
  }, [instanceRef, sliderOptions]);

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
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImg} alt="eSports" />

        <h1 className="text-6xl text-white font-black mt-20">
          Seu{' '}
          <span className="bg-nlw-gradient bg-clip-text text-transparent">
            duo
          </span>{' '}
          está aqui
        </h1>

        {isLoading && (
          <div className="flex  mt-16 mb--16">
            <LeapFrog color="#9572fc" />
          </div>
        )}
        <div className="navigation-wrapper w-full mt-16">
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

        <Dialog.Root>
          <CreateAdBanner />

          <CreateAdModal />
        </Dialog.Root>
      </div>
    </>
  );
}
