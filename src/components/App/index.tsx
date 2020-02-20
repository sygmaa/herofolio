import React, { useEffect, useState } from "react";
import useInterval from "use-interval";

import useKeyPress from "../../hooks/useKeyPress";
import { Ground } from "../Design/Ground";
import { Hero } from "../Design/Hero";
import { Sun } from "../Design/Sun";
import { GlobalStyle } from "../Design/GlobalStyles";
import { HighlightedText } from "../Design/HighlightedText";
import About from "../About";
import Case from "../Design/Case";
import Grid from "../Grid";
import GridElement from "../Grid/GridElement";

const GRID_WIDTH = 16;
const GRID_HEIGHT = 10;
const GROUND_HEIGHT = 2;
const HERO_SIZE = 1;
const STEP = 1;
const JUMP = 3;
const SKILLS_LEFT = 8;

const App = () => {
  const [heroLeft, setHeroLeft] = useState(1);
  const [heroBottom, setHeroBottom] = useState(GROUND_HEIGHT);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [skillsBottom, setSkillsBottom] = useState(GROUND_HEIGHT + JUMP);

  const left = useKeyPress("ArrowLeft");
  const right = useKeyPress("ArrowRight");
  const space = useKeyPress(" ");

  const rightHandler = () =>
    right && heroLeft < GRID_WIDTH - STEP && setHeroLeft(heroLeft + STEP);

  const leftHandler = () =>
    left && heroLeft > STEP && setHeroLeft(heroLeft - STEP);

  const onSkillsCollision = () => {
    setTimeout(() => {
      setSkillsBottom(GROUND_HEIGHT + JUMP + 1);
    }, 150);

    setTimeout(() => {
      setSkillsBottom(GROUND_HEIGHT + JUMP);
    }, 300);
  };

  const onJumping = () => {
    if (space && canJump) {
      setHeroBottom(GROUND_HEIGHT + JUMP);
      setCanJump(false);
      setTimeout(() => setHeroBottom(GROUND_HEIGHT), 200);
      setTimeout(() => setCanJump(true), 400);

      if (heroLeft === SKILLS_LEFT) {
        onSkillsCollision();
      }
    }
  };

  const handleHeroWalking = () => {
    if (left || right) {
      setIsWalking(true);
    } else {
      setIsWalking(false);
    }
  };

  const arrowsListener = () => {
    rightHandler();
    leftHandler();
    handleHeroWalking();
  };

  useInterval(arrowsListener, 200, true);

  useEffect(onJumping, [space]);

  return (
    <>
      <GlobalStyle />

      <HighlightedText>
        Hello, I'm Kévin Dumont, passionate web developer
      </HighlightedText>

      <About />

      {/* Game elements */}
      <Grid
        width="100vw"
        height="100vh"
        nbColumns={GRID_WIDTH}
        nbLines={GRID_HEIGHT}
      >
        <GridElement id="sun" right={1} top={2}>
          <Sun />
        </GridElement>

        <GridElement
          id="skills"
          left={SKILLS_LEFT}
          bottom={skillsBottom}
          transition={"all 0.3s ease"}
        >
          <Case>Skills</Case>
        </GridElement>

        <GridElement
          id="hero"
          bottom={heroBottom}
          left={heroLeft}
          height={HERO_SIZE}
          transition={"all 0.3s linear"}
        >
          <Hero
            isWalking={isWalking && canJump}
            isJumping={heroBottom !== GROUND_HEIGHT}
          />
        </GridElement>

        <GridElement
          id="ground"
          left={0}
          bottom={0}
          width={GRID_WIDTH}
          height={GROUND_HEIGHT}
        >
          <Ground />
        </GridElement>
      </Grid>
    </>
  );
};

export default App;
