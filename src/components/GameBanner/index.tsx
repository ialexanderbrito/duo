import { Link } from 'react-router-dom';

interface GameBannerProps {
  id: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <Link
      to={`/game/${props.id}`}
      className="keen-slider__slide relative rounded-lg overflow-hidden flex-shrink-0"
    >
      <img src={props.bannerUrl} alt={props.title} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="block text-sm font-bold text-white sm:text-base">
          {props.title}
        </strong>
        <span className="mt-1 text-xs text-zinc-300 sm:text-sm">
          {props.adsCount} anúncio{props.adsCount !== 1 && 's'}
        </span>
      </div>
    </Link>
  );
}
