import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Ground } from "../components/Design/Ground";
import { Hero } from "../components/Design/Hero";
import { Sun } from "../components/Design/Sun";
import Case from "../components/Design/Case";
import Grid from "../components/Grid";
import GridElement from "../components/Grid/GridElement";
import { Mountains } from "../components/Design/Moutains";
import { Cloud } from "../components/Design/Cloud";
import Modal from "../components/Modal";

import Avatar from "../assets/img/avatar.jpg";
import styled from "styled-components";
import { MEDIA } from "../constants";
import Castle from "../components/Design/Castle";

import useGameEngine from "../hooks/useGameEngine";

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
  padding: 20px;
  overflow: auto;

  h2 {
    margin-top: 0;
    font-size: 2rem;
  }

  p {
    line-height: 2.6rem;
  }
`;

const GRID_WIDTH = 120;
const GRID_HEIGHT = 10;
const GROUND_HEIGHT = 2;
const HERO_SIZE = 1;
const JUMP = 3;
const ELEMENT_WIDTH = 60;

const Profile = () => {
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

  const [skillsBottom, setSkillsBottom] = useState(GROUND_HEIGHT + JUMP);
  const [showPopin, setShowPopin] = useState(false);

  useEffect(() => {
    if (top) {
      console.log(positionInTheGrid);
    }
  }, [top]);

  useEffect(() => {
    if (space) {
      if (positionInTheGrid === 15) {
        setTimeout(() => setSkillsBottom(GROUND_HEIGHT + JUMP + 1), 100);
        setTimeout(() => setSkillsBottom(GROUND_HEIGHT + JUMP), 300);
      }
    }
  }, [space]);

  // if (heroLeft === GRID_WIDTH - 1) {
  //   setTimeout(() => {
  //     history.push("/skills");
  //   }, 200);
  // }

  return (
    <>
      {showPopin && (
        <Modal onClose={() => setShowPopin(false)}>
          <ModalContent>
            <img src={Avatar} alt="test" />
            <ModalRight>
              <h2>
                I'm <strong>Kévin Dumont</strong>, a web artisan
              </h2>
              <p style={{ fontFamily: '"Montserrat", sans-serif' }}>
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
        height="100vh"
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
          left={firstPlanLeft + 15}
          bottom={skillsBottom}
          zIndex={3}
        >
          <Case onClick={() => setShowPopin(true)}>Profile</Case>
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
          id="castle"
          left={firstPlanLeft + 20}
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

export default Profile;
