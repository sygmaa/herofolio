import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./containers/Profile";
import About from "./components/About";
import GlobalStyles from "./components/Design/GlobalStyles";
import Skills from "./containers/Skills";
import Commands from "./components/Commands";
import WithSizes, { Sizes } from "react-sizes";

interface AppProps {
  width: number;
}

const App = ({ width }: AppProps) => {
  const [touchSpace, setTouchSpace] = useState(false);
  const [touchTop, setTouchTop] = useState(false);
  const [touchLeft, setTouchLeft] = useState(false);
  const [touchRight, setTouchRight] = useState(false);
  const [touchBottom, setTouchBottom] = useState(false);

  return (
    <Router>
      <GlobalStyles />

      <About />

      <Switch>
        <Route path="/" exact>
          <Profile
            touchSpace={touchSpace}
            touchTop={touchTop}
            touchLeft={touchLeft}
            touchRight={touchRight}
            touchBottom={touchBottom}
          />
        </Route>
        <Route path="/skills" exact>
          <Skills
            touchSpace={touchSpace}
            touchTop={touchTop}
            touchLeft={touchLeft}
            touchRight={touchRight}
            touchBottom={touchBottom}
          />
        </Route>
      </Switch>

      <Commands
        onSpaceChange={v => {
          if (v) {
            setTouchSpace(true);
            setTimeout(() => setTouchSpace(false), 300);
          }
        }}
        onArrowUpChange={v => setTouchTop(v)}
        onArrowLeftChange={v => setTouchLeft(v)}
        onArrowRightChange={v => {
          setTouchRight(v);
        }}
        onArrowDownChange={() => {}}
      />
    </Router>
  );
};

const mapSizesToProps = ({ width }: Sizes) => ({ width });

export default WithSizes<AppProps, AppProps>(mapSizesToProps)(App);
