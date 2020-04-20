import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./containers/Profile";
import About from "./components/About";

import GlobalStyles from "./components/Design/GlobalStyles";
import Skills from "./containers/Skills";
import GameContext, {
  initContext,
  GameContextInterface,
  Location,
} from "./contexts/GameContext";
import { COINS } from "./constants";

const App = () => {
  const [coins, setCoins] = useState(COINS);
  const [heroPositions, setHeroPositions] = useState(initContext.heroPositions);
  const [nbJump, setNbJump] = useState(0);
  const [hasMove, setHasMove] = useState(false);

  const gameContext: GameContextInterface = {
    ...initContext,
    coins,
    startTimestamp: Date.now(),
    hasMove,
    heroPositions,
    nbJump,

    takeCoins(index: number) {
      const newCoins = [...coins];
      newCoins[index] = { ...newCoins[index], taken: true };

      setCoins(newCoins);
    },

    move(location: Location, position: number) {
      setHeroPositions({
        ...heroPositions,
        [location]: position,
      });
      setHasMove(true);
    },

    incrementJump() {
      setNbJump(nbJump + 1);
    },
  };

  return (
    <GameContext.Provider value={gameContext}>
      <Router>
        <GlobalStyles />

        <About />

        <Switch>
          <Route path="/" exact>
            <Profile />
          </Route>
          <Route path="/skills" exact>
            <Skills />
          </Route>
        </Switch>
      </Router>
    </GameContext.Provider>
  );
};

export default App;
