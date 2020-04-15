import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import useQuery from "../../hooks/useQuery";
import useMedia from "../../hooks/useMedia";

import {
  GRID_ELEMENT_WIDTH,
  GRID_SIZES_LARGE,
  GRID_SIZES_SMALL,
} from "../../constants";
import {
  ModalRight,
  Title,
  Presents,
  Subtitle,
  CommandsHelper,
  MainTitle,
} from "./styles";

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
import { Forest } from "../../components/Design/Forest";
import { Tree, Flower, Bamboos } from "../../components/Design/Vegetation";

// constants
export const CASTLE_LEFT = 40;
export const GRID_WIDTH = 90;
export const PROFILE_LEFT = 30;
export const LANDSCAPE_CHANGE = 45;
export const HEIGHT_OFFSET = {
  SMALL: {
    CASTLE_HEIGHT: 7,
    SUN_BOTTOM: 2,
    SUN_LEFT: 1,
    SKILLS_BOTTOM: 3,
  },
  LARGE: {
    CASTLE_HEIGHT: 6,
    SUN_BOTTOM: 3,
    SUN_LEFT: 4,
    SKILLS_BOTTOM: 5,
  },
};

const Profile = () => {
  const {
    GRID_HEIGHT,
    GROUND_HEIGHT,
    HERO_SIZE,
    JUMP,
    CASTLE_HEIGHT,
    SUN_BOTTOM,
    SUN_LEFT,
    SKILLS_BOTTOM: PROFILE_BOTTOM,
  } = useMedia((_, height) =>
    height < 600
      ? { ...GRID_SIZES_SMALL, ...HEIGHT_OFFSET.SMALL }
      : { ...GRID_SIZES_LARGE, ...HEIGHT_OFFSET.LARGE }
  );

  const query = useQuery();
  const history = useHistory();

  const initPosition = Number.parseInt(query.get("heroPosition") || "0") || 0;

  const [isJumping, setIsJumping] = useState(false);
  const [showPopin, setShowPopin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [hasJump, setHasJump] = useState(initPosition ? true : false);
  const [hasMove, setHasMove] = useState(initPosition ? true : false);

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
    setHasJump(true);

    if (p === PROFILE_LEFT) {
      setTimeout(() => setIsJumping(true), 100);
      setTimeout(() => {
        setIsJumping(false);
        openModal();
      }, 300);
    }
  };

  const onMove = () => setHasMove(true);

  return (
    <GameEngine
      isActive={isActive}
      groundHeight={GROUND_HEIGHT}
      jumpHeight={JUMP}
      elementWidth={GRID_ELEMENT_WIDTH}
      maxRightOffset={GRID_WIDTH}
      initPosition={initPosition}
      onJump={onJump}
      onTop={onTop}
      onMove={onMove}
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
        fithPlanLeft,
        isTouchDevice,
        Grid,
        GridElement: Element,
        centerPosition,
        positionInTheGrid,
      }) => (
        <>
          <Grid
            width="100vw"
            height={window.innerHeight + "px"}
            elementWidth={`${GRID_ELEMENT_WIDTH}px`}
            nbLines={GRID_HEIGHT}
            style={{
              background:
                positionInTheGrid < LANDSCAPE_CHANGE ? "#79d4ff" : "#ffcde2",
              transition: "background 2s ease",
            }}
          >
            {/* -- TITLE -- */}

            <Element
              id="title"
              left={firstPlanLeft + centerPosition - 3}
              width={8}
              bottom={GROUND_HEIGHT}
              zIndex={9}
              height={2}
            >
              <Title>
                <Flower
                  zIndex={0}
                  bottom={20}
                  color="#ffffff"
                  rodColor={"#4ca446"}
                  left={-25}
                />
                <Flower zIndex={0} bottom={50} color="#fd4f5e" left={30} />
                <Flower zIndex={-1} bottom={120} color="#ce3744" left={120} />
                <Flower
                  zIndex={0}
                  bottom={70}
                  color="#ffffff"
                  right={40}
                  rodColor={"#4ca446"}
                />
                <Flower
                  zIndex={0}
                  bottom={20}
                  color="#ffffff"
                  rodColor={"#4ca446"}
                  left={-25}
                />
                <Flower
                  zIndex={1}
                  bottom={0}
                  color="#ce3744"
                  right={-20}
                  rodColor={"#4ca446"}
                />
                <MainTitle>
                  Kevin <span>Dumont</span>
                </MainTitle>
                <Presents>presents</Presents>
                <Subtitle>Herofolio</Subtitle>
              </Title>
            </Element>

            {/* -- INSTRUCTIONS -- */}

            <Element
              id="instructions"
              left={centerPosition - 2}
              bottom={0}
              zIndex={11}
              width={6}
              height={GROUND_HEIGHT}
            >
              {(!hasJump || !hasMove) && (
                <>
                  {!isTouchDevice && (
                    <CommandsHelper>
                      Use your keyboard arrows to move and space to jump!
                    </CommandsHelper>
                  )}

                  {isTouchDevice && (
                    <CommandsHelper>
                      Use the commands on the right to move and jump!
                    </CommandsHelper>
                  )}
                </>
              )}
            </Element>

            {/* -- CASE -- */}

            <Element
              id="profile"
              left={firstPlanLeft + PROFILE_LEFT}
              bottom={PROFILE_BOTTOM + (isJumping ? 1 : 0)}
              zIndex={6}
            >
              <Case onClick={openModal}>Profile</Case>
            </Element>

            {/* -- CASTLE -- */}

            <Element
              id="door"
              left={firstPlanLeft + CASTLE_LEFT + 1}
              bottom={GROUND_HEIGHT}
              width={3}
              height={3}
              zIndex={7}
            >
              <Door />
            </Element>

            <Element
              id="castle"
              left={firstPlanLeft + CASTLE_LEFT}
              height={CASTLE_HEIGHT}
              zIndex={6}
              bottom={GROUND_HEIGHT}
              width={5}
            >
              <Castle />
              <Bamboos right={-30} zIndex={-1} scale={0.8} rotate={2} />
            </Element>

            {/* -- ALL LANDSCAPE AND COMMONS -- */}

            {/* -- HERO -- */}

            <Element
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
            </Element>

            {/* -- TREES -- */}

            <Element
              id="treesSecond"
              left={secondPlanLeft}
              width={GRID_WIDTH}
              bottom={GROUND_HEIGHT}
              zIndex={4}
              height={2}
            >
              <Tree scale={0.5} rotate={1} left={100} pale={true} />
              <Tree scale={0.6} rotate={0} left={350} pale={true} />
              <Tree scale={0.6} rotate={0} left={950} pale={true} />
              <Tree scale={0.5} rotate={2} left={1200} pale={true} />
              <Bamboos left={1500} zIndex={-1} scale={0.6} rotate={-1} />
              <Bamboos left={1520} zIndex={-1} scale={0.6} rotate={1} />
              <Bamboos left={1800} zIndex={-1} scale={0.3} rotate={-1} />
              <Bamboos left={1820} zIndex={-1} scale={0.3} rotate={0} />
              <Bamboos left={2050} zIndex={-1} scale={0.5} rotate={-1} />
              <Bamboos left={2070} zIndex={-1} scale={0.5} rotate={0} />
              <Bamboos left={2300} zIndex={-1} scale={0.4} rotate={0} />
              <Bamboos left={2320} zIndex={-1} scale={0.4} rotate={2} />
            </Element>

            <Element
              id="trees"
              left={firstPlanLeft + 7}
              width={GRID_WIDTH}
              bottom={GROUND_HEIGHT}
              zIndex={4}
              height={2}
            >
              <Tree scale={0.9} rotate={0} left={1100} />
              <Tree scale={1} rotate={-1} left={1700} />
              <Bamboos left={2000} zIndex={-1} scale={0.8} rotate={2} />
              <Bamboos left={2300} zIndex={-1} scale={0.9} rotate={1} />
              <Bamboos left={2650} zIndex={-1} scale={0.9} rotate={1} />
            </Element>

            <Element
              id="forest"
              left={thirdPlanLeft}
              height={4}
              zIndex={3}
              bottom={GROUND_HEIGHT}
              width={GRID_WIDTH + 8}
            >
              <Forest />
              <Forest
                color={"#8ebd43"}
                style={{
                  opacity: positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1,
                  transition: "all 2s ease",
                }}
              />
            </Element>

            {/* -- MOUTAINS -- */}

            <Element
              id="moutains"
              left={fourthPlanLeft}
              height={4}
              zIndex={2}
              bottom={GROUND_HEIGHT}
              width={GRID_WIDTH + 8}
            >
              <Mountains
                angle={165}
                percent={65}
                moutainWidth={5}
                mountainHeight={15}
                background={"#9e8791"}
                style={{
                  opacity: positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1,
                  position: "absolute",
                }}
              />
              <Mountains
                angle={165}
                percent={65}
                moutainWidth={5}
                mountainHeight={15}
                background={"#6bbce2"}
              />
            </Element>

            {/* -- CLOUDS -- */}
            <Element
              id="cloud1"
              top={2}
              left={1 + fithPlanLeft}
              width={3}
              height={2}
              zIndex={1}
            >
              <Cloud />
            </Element>

            <Element
              id="cloud2"
              top={3}
              left={9 + fithPlanLeft}
              width={3}
              height={2}
              zIndex={1}
            >
              <Cloud />
            </Element>

            <Element
              id="cloud3"
              top={1}
              left={17 + fithPlanLeft}
              width={3}
              height={2}
              zIndex={1}
            >
              <Cloud />
            </Element>

            <Element
              id="cloud4"
              top={2}
              left={25 + fithPlanLeft}
              width={3}
              height={2}
              zIndex={1}
            >
              <Cloud />
            </Element>

            <Element
              id="cloud5"
              top={1}
              left={35 + fithPlanLeft}
              width={3}
              height={2}
              zIndex={1}
            >
              <Cloud />
            </Element>

            {/* -- SUN -- */}

            <Element
              id="sun"
              left={SUN_LEFT}
              bottom={SUN_BOTTOM}
              width={3}
              height={3}
            >
              <Sun
                color={
                  positionInTheGrid > LANDSCAPE_CHANGE ? "#ffffcc" : undefined
                }
              />
            </Element>

            {/* -- GROUND -- */}

            <Element
              id="ground"
              left={firstPlanLeft}
              bottom={0}
              width={GRID_WIDTH}
              height={GROUND_HEIGHT}
              zIndex={10}
            >
              <Ground
                grassColor={"#b1ec54"}
                groundColor={"#b8a48c"}
                style={{
                  opacity: positionInTheGrid < LANDSCAPE_CHANGE ? 0 : 1,
                  position: "absolute",
                }}
              />
              <Ground grassColor={"#4ba446"} groundColor={"#896443"} />
            </Element>
          </Grid>

          {showPopin && (
            <Modal>
              {({ CloseButton, Container }) => (
                <>
                  <CloseButton onClick={closeModal} size={4} />
                  <Container>
                    <ModalRight>
                      <h2>
                        I'm <strong>Kévin Dumont</strong>, a web artisan
                      </h2>
                      <p>
                        I'm creative. I create websites in their entirety.
                        Design, development, deployment. So, we can say I'm a
                        full stack developer. I love challenges. I'm a real
                        passionate. I'm 100% self-taught, I'm interested by the
                        back-end web development since I was 14. Today, I prefer
                        the front-end development because it's more
                        sophisticated. I am still learning new technologies to
                        stay up to date and improve my knowledge.
                      </p>
                    </ModalRight>
                  </Container>
                </>
              )}
            </Modal>
          )}
        </>
      )}
    </GameEngine>
  );
};

export default Profile;
