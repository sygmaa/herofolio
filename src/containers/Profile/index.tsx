import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import useQuery from "../../hooks/useQuery";

import GameEngine from "../../components/GameEngine";
import { Ground } from "../../components/Design/Ground";
import { Hero } from "../../components/Design/Hero";
import { Sun } from "../../components/Design/Sun";
import Case from "../../components/Design/Case";
import { Mountains } from "../../components/Design/Moutains";
import { Cloud } from "../../components/Design/Cloud";
import Modal from "../../components/Modal";
import Castle from "../../components/Design/Castle";
import { Door } from "../../components/Design/Door";
import { ModalRight, ModalContent } from "./styles";
import useMedia from "../../hooks/useMedia";

export const CASTLE_LEFT = 40;
const GRID_WIDTH = 60;
const ELEMENT_WIDTH = 60;
const PROFILE_LEFT = 20;

const SMALL = {
  GRID_HEIGHT: 5,
  GROUND_HEIGHT: 1,
  HERO_SIZE: 1,
  JUMP: 2,
  CASTLE_HEIGHT: 7,
  SUN_BOTTOM: 2
};

const LARGE = {
  GRID_HEIGHT: 10,
  GROUND_HEIGHT: 2,
  HERO_SIZE: 3,
  JUMP: 3,
  CASTLE_HEIGHT: 6,
  SUN_BOTTOM: 3
};

const Profile = () => {
  const {
    GRID_HEIGHT,
    GROUND_HEIGHT,
    HERO_SIZE,
    JUMP,
    CASTLE_HEIGHT,
    SUN_BOTTOM
  } = useMedia((width, height) => {
    if (height < 400) {
      return SMALL;
    }
    return LARGE;
  });

  const [skillsBottom, setSkillsBottom] = useState(GROUND_HEIGHT + JUMP);
  const [showPopin, setShowPopin] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const query = useQuery();
  const history = useHistory();

  const initPosition = Number.parseInt(query.get("heroPosition") || "0") || 0;

  const closeModal = () => {
    setShowPopin(false);
    setIsActive(true);
  };

  const openModal = () => {
    setShowPopin(true);
    setIsActive(false);
  };

  const onTop = (p: number) => {
    if (p === CASTLE_LEFT + 2) {
      setTimeout(() => {
        history.push("/skills");
      }, 200);
    }
  };

  const onJump = (p: number) => {
    if (p === PROFILE_LEFT) {
      setTimeout(() => setSkillsBottom(GROUND_HEIGHT + JUMP + 1), 100);
      setTimeout(() => {
        setSkillsBottom(GROUND_HEIGHT + JUMP);
        openModal();
      }, 300);
    }
  };

  const onResize = () => setSkillsBottom(GROUND_HEIGHT + JUMP);

  return (
    <>
      {/* Game elements */}
      <GameEngine
        isActive={isActive}
        groundHeight={GROUND_HEIGHT}
        jumpHeight={JUMP}
        elementWidth={ELEMENT_WIDTH}
        maxRightOffset={GRID_WIDTH}
        initPosition={initPosition}
        onJump={onJump}
        onTop={onTop}
        onResize={onResize}
      >
        {({
          canJump,
          heroBottom,
          heroLeft,
          isWalking,
          firstPlanLeft,
          secondPlanLeft,
          thirdPlanLeft,
          fourthPlanLeft,
          Grid,
          GridElement
        }) => (
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

            <GridElement
              id="sun"
              left={6}
              bottom={SUN_BOTTOM}
              width={3}
              height={3}
            >
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
              height={CASTLE_HEIGHT}
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
              zIndex={2}
            >
              <Ground grassColor="#4ba446" groundColor="#896443" />
            </GridElement>
          </Grid>
        )}
      </GameEngine>

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
    </>
  );
};

export default Profile;
