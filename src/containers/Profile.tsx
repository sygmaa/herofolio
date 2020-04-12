import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import withSizes, { Sizes } from "react-sizes";

import { Ground } from "../components/Design/Ground";
import { Hero } from "../components/Design/Hero";
import { Sun } from "../components/Design/Sun";
import Case from "../components/Design/Case";
import Grid from "../components/Grid";
import GridElement from "../components/Grid/GridElement";
import { Mountains } from "../components/Design/Moutains";
import { Cloud } from "../components/Design/Cloud";
import Modal from "../components/Modal";

import styled from "styled-components";
import { MEDIA } from "../constants";
import Castle from "../components/Design/Castle";

import useGameEngine from "../hooks/useGameEngine";
import { Door } from "../components/Design/Door";

const ModalContent = styled.div`
  display: flex;
  max-height: 377px;

  img {
    ${MEDIA.MAX_S} {
      display: none;
    }
  }
`;

const ModalRight = styled.div`
  padding: 30px;
  overflow: auto;

  h2 {
    margin-top: 0;
    font-size: 2rem;
  }

  p {
    line-height: 2.6rem;
    font-family: "Montserrat", sans-serif;
  }
`;

const GRID_WIDTH = 60;
const GRID_HEIGHT = 10;
const GROUND_HEIGHT = 2;
const HERO_SIZE = 1;
const JUMP = 3;
const ELEMENT_WIDTH = 60;

// Elements
const PROFILE_LEFT = 20;
export const CASTLE_LEFT = 40;

export interface ProfileProps {
  touchSpace: boolean;
  touchTop: boolean;
  touchLeft: boolean;
  touchRight: boolean;
  touchBottom: boolean;
  width: number;
  height: number;
}

const Profile = ({
  touchSpace,
  touchTop,
  touchLeft,
  touchRight,
  touchBottom,
  width,
  height
}: ProfileProps) => {
  const [skillsBottom, setSkillsBottom] = useState(GROUND_HEIGHT + JUMP);
  const [showPopin, setShowPopin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const location = useLocation<undefined | { heroPosition: number }>();

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
    initPosition: location.state?.heroPosition,
    screenWidth: width
  });

  const history = useHistory();

  const closeModal = () => {
    setShowPopin(false);
    setIsActive(true);
  };

  const openModal = () => {
    setShowPopin(true);
    setIsActive(false);
  };

  useEffect(() => {
    if (top) {
      if (isActive && positionInTheGrid === CASTLE_LEFT + 2) {
        setTimeout(() => {
          history.push("/skills");
        }, 200);
      }
    }
  }, [top]);

  useEffect(() => {
    if (space) {
      if (isActive && positionInTheGrid === PROFILE_LEFT) {
        setTimeout(() => setSkillsBottom(GROUND_HEIGHT + JUMP + 1), 100);
        setTimeout(() => {
          setSkillsBottom(GROUND_HEIGHT + JUMP);
          openModal();
        }, 300);
      }
    }
  }, [space]);

  return (
    <>
      {showPopin && (
        <Modal onClose={closeModal}>
          <ModalContent>
            <ModalRight>
              <h2>
                I'm <strong>Kévin Dumont</strong>, a web artisan
              </h2>
              <p>
                I'm creative. I create websites in their entirety. Design,
                development, deployment. So, we can say I'm a full stack
                developer. I love challenges. I'm a real passionate. I'm 100%
                self-taught, I'm interested by the back-end web development
                since I was 14. Today, I prefer the front-end development
                because it's more sophisticated. I am still learning new
                technologies to stay up to date and improve my knowledge.
              </p>
            </ModalRight>
          </ModalContent>
        </Modal>
      )}

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
          id="cloud1"
          top={2}
          left={2 + fourthPlanLeft}
          width={3}
          height={2}
          zIndex={1}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement
          id="cloud2"
          top={3}
          left={9 + fourthPlanLeft}
          width={3}
          height={2}
          zIndex={1}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement
          id="cloud3"
          top={1}
          left={17 + fourthPlanLeft}
          width={3}
          height={2}
          zIndex={1}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement
          id="cloud4"
          top={2}
          left={25 + fourthPlanLeft}
          width={3}
          height={2}
          zIndex={1}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement
          id="cloud5"
          top={1}
          left={35 + fourthPlanLeft}
          width={3}
          height={2}
          zIndex={1}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement id="sun" left={6} bottom={3} width={3} height={3}>
          <Sun />
        </GridElement>

        <GridElement
          id="skills"
          left={firstPlanLeft + PROFILE_LEFT}
          bottom={skillsBottom}
          zIndex={3}
        >
          <Case onClick={openModal}>Profile</Case>
        </GridElement>

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
          id="moutains"
          left={secondPlanLeft - 8}
          height={4}
          zIndex={1}
          bottom={GROUND_HEIGHT}
          width={GRID_WIDTH + 8}
        >
          <Mountains
            angle={165}
            percent={65}
            moutainWidth={5}
            mountainHeight={15}
            background="#b4e4eb"
          />
        </GridElement>

        <GridElement
          id="moutains2"
          left={thirdPlanLeft}
          height={3}
          zIndex={2}
          bottom={GROUND_HEIGHT}
          width={GRID_WIDTH}
        >
          <Mountains
            angle={165}
            percent={65}
            moutainWidth={5}
            mountainHeight={15}
            background="#a5ccd0"
          />
        </GridElement>

        <GridElement
          id="door"
          left={firstPlanLeft + CASTLE_LEFT + 1}
          bottom={GROUND_HEIGHT}
          width={3}
          height={3}
          zIndex={3}
        >
          <Door />
        </GridElement>
        <GridElement
          id="castle"
          left={firstPlanLeft + CASTLE_LEFT}
          height={5}
          zIndex={2}
          bottom={GROUND_HEIGHT}
          width={5}
        >
          <Castle />
        </GridElement>

        <GridElement
          id="ground"
          left={firstPlanLeft}
          bottom={0}
          width={GRID_WIDTH}
          height={GROUND_HEIGHT}
        >
          <Ground grassColor="#4ba446" groundColor="#896443" />
        </GridElement>
      </Grid>
    </>
  );
};

const mapSizesToProps = (sizes: Sizes) => sizes;

export default withSizes<Sizes, ProfileProps>(mapSizesToProps)(Profile);
