import React from "react";
import { useHistory } from "react-router-dom";

import GameEngine from "../components/GameEngine";
import { Hero } from "../components/Design/Hero";
import { BrickBg } from "../components/Design/BrickBg";
import { Door } from "../components/Design/Door";
import { HOUSE_LEFT } from "./Profile";
import useMedia from "../hooks/useMedia";
import {
  GRID_ELEMENT_WIDTH,
  GRID_SIZES_SMALL,
  GRID_SIZES_LARGE,
} from "../constants";

export const GRID_WIDTH = 70;
export const DOOR_HEIGHT = 3;

const Skills = () => {
  const history = useHistory();

  const { GROUND_HEIGHT, JUMP, GRID_HEIGHT, HERO_SIZE } = useMedia(
    (_, height) => {
      if (height < 600) {
        return {
          ...GRID_SIZES_SMALL,
        };
      }
      return {
        ...GRID_SIZES_LARGE,
      };
    }
  );

  const onTop = (p: number) => {
    if (p === 1) {
      setTimeout(() => {
        history.push(`/?heroPosition=${HOUSE_LEFT + 2}`);
      }, 200);
    }
  };

  return (
    <GameEngine
      isActive={true}
      groundHeight={GROUND_HEIGHT}
      jumpHeight={JUMP}
      elementWidth={GRID_ELEMENT_WIDTH}
      maxRightOffset={GRID_WIDTH}
      onTop={onTop}
    >
      {({
        canJump,
        heroBottom,
        isWalking,
        firstPlanLeft,
        secondPlanLeft,
        heroLeft,
        Grid,
        GridElement,
      }) => (
        <Grid
          width="100vw"
          height={window.innerHeight + "px"}
          elementWidth={`${GRID_ELEMENT_WIDTH}px`}
          nbLines={GRID_HEIGHT}
          style={{
            backgroundImage: "linear-gradient(170deg,#c3efff 0%,#cdfaff 95%)",
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
            height={DOOR_HEIGHT}
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
                height: "100%",
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
                height: "100%",
              }}
            />
          </GridElement>
        </Grid>
      )}
    </GameEngine>
  );
};

export default Skills;
