import React, { useEffect, useState } from "react";
import useInterval from "use-interval";

import useKeyPress from "../hooks/useKeyPress";
import { Ground } from "../components/Design/Ground";
import { Hero } from "../components/Design/Hero";
import { Sun } from "../components/Design/Sun";
import { HighlightedText } from "../components/Design/HighlightedText";
import Case from "../components/Design/Case";
import Grid from "../components/Grid";
import GridElement from "../components/Grid/GridElement";
import { Mountains } from "../components/Design/Moutains";
import { Cloud } from "../components/Design/Cloud";
import Modal from "../components/Modal";
import { BrickBg } from "../components/Design/BrickBg";

const GRID_WIDTH = 16;
const GRID_HEIGHT = 10;
const GROUND_HEIGHT = 1;
const HERO_SIZE = 1;
const STEP = 1;
const JUMP = 3;
const SKILLS_LEFT = 8;

const Skills = () => {
  const [heroLeft, setHeroLeft] = useState(1);
  const [heroBottom, setHeroBottom] = useState(GROUND_HEIGHT);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [skillsBottom, setSkillsBottom] = useState(GROUND_HEIGHT + JUMP);
  const [showPopin, setShowPopin] = useState(false);

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
      setShowPopin(true);
    }, 300);
  };

  const onJumping = () => {
    if (space && canJump && !showPopin) {
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
    if (!showPopin) {
      rightHandler();
      leftHandler();
      handleHeroWalking();
    }
  };

  useInterval(arrowsListener, 200, true);

  useEffect(onJumping, [space]);

  return (
    <>
      {showPopin && (
        <Modal onClose={() => setShowPopin(false)}>
          <div
            style={{
              padding: 20
            }}
          >
            <p style={{ fontFamily: '"Montserrat", sans-serif' }}>Todo</p>
          </div>
        </Modal>
      )}

      {/* Game elements */}
      <Grid
        width="100vw"
        height="100vh"
        nbColumns={GRID_WIDTH}
        nbLines={GRID_HEIGHT}
      >
        <GridElement
          id="skills"
          left={SKILLS_LEFT}
          bottom={skillsBottom}
          zIndex={3}
          transition={"all 0.3s ease"}
        >
          <Case onClick={() => setShowPopin(true)}>Skills</Case>
        </GridElement>

        <GridElement
          id="hero"
          bottom={heroBottom}
          left={heroLeft}
          zIndex={10}
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
          height={GRID_HEIGHT}
          zIndex={0}
        >
          <BrickBg
            color1="#444"
            color2="#232323"
            color3="#232323"
            style={{ width: "100%" }}
          />
        </GridElement>

        <GridElement
          id="ground"
          left={0}
          bottom={0}
          width={GRID_WIDTH}
          height={GROUND_HEIGHT}
          zIndex={1}
        >
          <BrickBg
            color1="silver"
            color2="gray"
            color3="gray"
            style={{ width: "100%" }}
          />
        </GridElement>
      </Grid>
    </>
  );
};

export default Skills;
