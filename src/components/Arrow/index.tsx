import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react';

interface ArrowProps {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}

export function Arrow(props: ArrowProps) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';

  return (
    <div
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabeld}`}
    >
      {props.left && <ArrowCircleLeft className="text-white" size={24} />}
      {!props.left && <ArrowCircleRight className="text-white" size={24} />}
    </div>
  );
}
