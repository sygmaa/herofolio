import React, { useEffect, useState } from "react";
import useInterval from "use-interval";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import useKeyPress from "../../hooks/useKeyPress";
import { Ground } from "../Design/Ground";
import { Hero } from "../Design/Hero";
import { Sun } from "../Design/Sun";
import { GlobalStyle } from "../Design/GlobalStyles";
import { HighlightedText } from "../Design/HighlightedText";
import { Info } from "../Design/Info";
import Case from "../Design/Case";
import Grid from "../Grid";
import GridElement from "../Grid/GridElement";

const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;
const GROUND_HEIGHT = 3;
const HERO_SIZE = 3;
const STEP = 1;
const JUMP = 2;

const App = () => {
  const [heorLeft, setHeroLeft] = useState(1);
  const [heroBottom, setHeroBottom] = useState(3);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [skillsBottom, setSkillsBottom] = useState(6);

  const left = useKeyPress("ArrowLeft");
  const right = useKeyPress("ArrowRight");
  const space = useKeyPress(" ");

  const rightHandler = () =>
    right && heorLeft < GRID_WIDTH - STEP && setHeroLeft(heorLeft + STEP);

  const leftHandler = () =>
    left && heorLeft > STEP && setHeroLeft(heorLeft - STEP);

  const onSkillsCollision = () => {
    setTimeout(() => {
      setSkillsBottom(GROUND_HEIGHT + HERO_SIZE + JUMP);
    }, 150);

    setTimeout(() => {
      setSkillsBottom(GROUND_HEIGHT + HERO_SIZE);
    }, 300);
  };

  const onSpaceTyping = () => {
    if (space && canJump) {
      setHeroBottom(GROUND_HEIGHT + HERO_SIZE);
      setCanJump(false);
      setTimeout(() => setHeroBottom(GROUND_HEIGHT), 200);
      setTimeout(() => setCanJump(true), 400);

      if (heorLeft === 5) {
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

  useEffect(onSpaceTyping, [space]);

  return (
    <>
      <GlobalStyle />

      <HighlightedText>
        Hello, I'm Kévin Dumont, passionate web developer
      </HighlightedText>

      <Info>
        <FontAwesomeIcon icon={faQuestionCircle} size={"lg"} />
        <p>About</p>
      </Info>

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

        <GridElement id="skills" left={5} bottom={skillsBottom}>
          <Case>Skills</Case>
        </GridElement>

        <GridElement
          id="hero"
          bottom={heroBottom}
          left={heorLeft}
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
