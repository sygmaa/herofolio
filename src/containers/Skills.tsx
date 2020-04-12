import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Hero } from "../components/Design/Hero";
import Grid from "../components/Grid";
import GridElement from "../components/Grid/GridElement";

import useGameEngine from "../hooks/useGameEngine";
import { BrickBg } from "../components/Design/BrickBg";
import { Door } from "../components/Design/Door";
import { CASTLE_LEFT } from "./Profile";
import WithSizes, { Sizes } from "react-sizes";

const GRID_WIDTH = 70;
const GRID_HEIGHT = 10;
const GROUND_HEIGHT = 2;
const HERO_SIZE = 1;
const JUMP = 3;
const ELEMENT_WIDTH = 60;

export interface SkillProps {
  touchSpace: boolean;
  touchTop: boolean;
  touchLeft: boolean;
  touchRight: boolean;
  touchBottom: boolean;
  width: number;
  height: number;
}

const Skills = ({
  touchSpace,
  touchTop,
  touchLeft,
  touchRight,
  touchBottom,
  width,
  height
}: SkillProps) => {
  const [isActive, setIsActive] = useState(true);

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
    isActive,
    groundHeight: GROUND_HEIGHT,
    jump: JUMP,
    elementWidth: ELEMENT_WIDTH,
    maxRightOffset: GRID_WIDTH,
    touchSpace,
    touchTop,
    touchLeft,
    touchRight,
    touchBottom,
    screenWidth: width
  });

  const history = useHistory();

  useEffect(() => {
    if (top) {
      if (positionInTheGrid === 1) {
        setTimeout(() => {
          history.push(`/?heroPosition=${CASTLE_LEFT + 2}`);
        }, 200);
      }
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
        height={window.innerHeight + "px"}
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
          id="door"
          left={secondPlanLeft}
          bottom={GROUND_HEIGHT}
          width={3}
          height={3}
          zIndex={1}
        >
          <Door />
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

const mapSizesToProps = (sizes: Sizes) => sizes;

export default WithSizes<Sizes, SkillProps>(mapSizesToProps)(Skills);
