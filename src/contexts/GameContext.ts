import { createContext } from "react";

export interface GameContext {
  coins: boolean[];
  startTimestamp: number;
  takeCoins: (index: number) => any;
}

export default createContext<GameContext>({
  coins: Array(6).fill(false),
  takeCoins: () => undefined,
  startTimestamp: 0,
});
