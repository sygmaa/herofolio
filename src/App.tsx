import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./containers/Profile";
import About from "./components/About";

import GlobalStyles from "./components/Design/GlobalStyles";
import Skills from "./containers/Skills";
import GameContext from "./contexts/GameContext";

interface AppProps {
  width: number;
}

const App = () => {
  const initCoins = Array(6).fill(false);

  const [coins, setCoins] = useState(initCoins);

  const takeCoins = (index: number) => {
    const newCoins = [...coins];
    newCoins[index] = true;
    setCoins(newCoins);
  };

  const gameContext = {
    coins,
    takeCoins,
    startTimestamp: Date.now(),
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
