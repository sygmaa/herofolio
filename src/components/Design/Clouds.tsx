import React from "react";
import { Cloud } from "./Cloud";
import { GameElement } from "../GameEngine/styles";

export interface CloudsProps {
  GameElement: typeof GameElement;
  getY: (distance: number) => number;
  getX: (distance: number) => number;
}

const Clouds = ({ GameElement, getY, getX }: CloudsProps) => {
  const clouds = [
    { top: 2, left: 1 },
    { top: 3, left: 9 },
    { top: 1, left: 17 },
    { top: 2, left: 25 },
    { top: 2, left: 35 },
    { top: 3, left: 42 },
  ];

  return (
    <>
      {clouds.map((cloud, id) => (
        <GameElement
          key={id}
          zIndex={1}
          top={getY(cloud.top)}
          left={getX(cloud.left)}
          width={getX(3)}
          height={getY(2)}
        >
          <Cloud />
        </GameElement>
      ))}
    </>
  );
};

export default React.memo(Clouds);
