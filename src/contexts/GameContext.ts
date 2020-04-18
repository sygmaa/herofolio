import { createContext } from "react";

export type Location = "profile" | "skills" | "experiences" | "hobbies";

export interface Coin {
  location: Location;
  taken: boolean;
  position: number;
}

export interface GameContextInterface {
  coins: Coin[];
  startTimestamp: number;
  nbJump: number;
  hasMove: boolean;
  takeCoins: (index: number) => any;
  heroPositions: {
    [k in Location]: number;
  };
  move: (location: Location, position: number) => any;
  incrementJump: () => any;
}

export const initContext: GameContextInterface = {
  coins: [],
  hasMove: false,
  startTimestamp: 0,
  heroPositions: {
    profile: 0,
    experiences: 0,
    hobbies: 0,
    skills: 0,
  },
  nbJump: 0,
  takeCoins: () => undefined,
  move: () => undefined,
  incrementJump: () => undefined,
};

export default createContext<GameContextInterface>(initContext);
