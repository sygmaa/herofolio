import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./containers/Profile";
// import Skills from "./containers/Skills";
import About from "./components/About";
import GlobalStyles from "./components/Design/GlobalStyles";
import Skills from "./containers/Skills";

const App = () => {
  return (
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
  );
};

export default App;
