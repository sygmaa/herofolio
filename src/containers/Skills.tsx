import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Hero } from "../components/Design/Hero";
import Grid from "../components/Grid";
import GridElement from "../components/Grid/GridElement";

import useGameEngine from "../hooks/useGameEngine";
import { BrickBg } from "../components/Design/BrickBg";

const GRID_WIDTH = 70;
const GRID_HEIGHT = 10;
const GROUND_HEIGHT = 2;
const HERO_SIZE = 1;
const JUMP = 3;
const ELEMENT_WIDTH = 60;

const Skills = () => {
  const {
    canJump,
    heroBottom,
    isWalking,
    firstPlanLeft,
    secondPlanLeft,
    thirdPlanLeft,
    fourthPlanLeft,
    heroLeft,
    top,
    space,
    positionInTheGrid
  } = useGameEngine({
    groundHeight: GROUND_HEIGHT,
    isActive: true,
    jump: JUMP,
    elementWidth: ELEMENT_WIDTH,
    maxRightOffset: GRID_WIDTH
  });

  const history = useHistory();

  useEffect(() => {
    if (top) {
    }
  }, [top]);

  useEffect(() => {
    if (space) {
    }
  }, [space]);

  return (
    <>
      {/* Game elements */}
      <Grid
        width="100vw"
        height="100vh"
        elementWidth={`${ELEMENT_WIDTH}px`}
        nbLines={GRID_HEIGHT}
        style={{
          backgroundImage: "linear-gradient(170deg,#c3efff 0%,#cdfaff 95%)"
        }}
      >
        <GridElement
          id="hero"
          bottom={heroBottom}
          left={heroLeft}
          zIndex={10}
          height={HERO_SIZE}
        >
          <Hero
            isWalking={isWalking && canJump}
            isJumping={heroBottom !== GROUND_HEIGHT}
          />
        </GridElement>

        <GridElement
          id="ground"
          left={firstPlanLeft}
          bottom={0}
          width={GRID_WIDTH}
          height={GROUND_HEIGHT}
          zIndex={1}
        >
          <BrickBg
            color1="silver"
            color2="gray"
            color3="gray"
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        </GridElement>

        <GridElement
          id="bg"
          left={secondPlanLeft}
          bottom={GROUND_HEIGHT}
          width={GRID_WIDTH}
          height={GRID_HEIGHT - GROUND_HEIGHT}
        >
          <BrickBg
            color1="#6e6e6e"
            color2="#393939"
            color3="#3b3b3b"
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        </GridElement>
      </Grid>
    </>
  );
};

export default Skills;
