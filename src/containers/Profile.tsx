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

import Avatar from "../assets/img/avatar.jpg";
import styled from "styled-components";
import { MEDIA } from "../constants";
import Castle from "../components/Design/Castle";
import { useHistory } from "react-router-dom";

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

const GRID_WIDTH = 16;
const GRID_HEIGHT = 10;
const GROUND_HEIGHT = 1;
const HERO_SIZE = 1;
const STEP = 1;
const JUMP = 3;
const SKILLS_LEFT = 8;

const Profile = () => {
  const [heroLeft, setHeroLeft] = useState(1);
  const [heroBottom, setHeroBottom] = useState(GROUND_HEIGHT);
  const [isWalking, setIsWalking] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [skillsBottom, setSkillsBottom] = useState(GROUND_HEIGHT + JUMP);
  const [showPopin, setShowPopin] = useState(false);

  const history = useHistory();

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

    setTimeout(() => {
      setShowPopin(true);
      setIsWalking(false);
    }, 400);
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

      if (heroLeft === GRID_WIDTH - 1) {
        setTimeout(() => {
          history.push("/skills");
        }, 200);
      }
    }
  };

  useInterval(arrowsListener, 200, true);

  useEffect(onJumping, [space]);

  return (
    <>
      <HighlightedText>
        Hello, I'm Kévin Dumont, passionate web developer
      </HighlightedText>

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
        nbColumns={GRID_WIDTH}
        nbLines={GRID_HEIGHT}
        style={{
          backgroundImage: "linear-gradient(170deg,#c3efff 0%,#cdfaff 95%)"
        }}
      >
        <GridElement
          id="cloud1"
          top={2}
          right={0}
          width={3}
          height={2}
          zIndex={0}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement
          id="cloud2"
          top={3}
          left={2}
          width={3}
          height={2}
          zIndex={0}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement
          id="cloud3"
          top={1}
          left={7}
          width={3}
          height={2}
          zIndex={0}
        >
          <Cloud color="#fff" />
        </GridElement>

        <GridElement id="sun" left={3} bottom={1} width={3} height={3}>
          <Sun />
        </GridElement>

        <GridElement
          id="skills"
          left={SKILLS_LEFT}
          bottom={skillsBottom}
          zIndex={3}
          transition={"all 0.3s ease"}
        >
          <Case onClick={() => setShowPopin(true)}>Profile</Case>
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
          id="moutains"
          left={0}
          height={4}
          zIndex={1}
          bottom={GROUND_HEIGHT}
          width={GRID_WIDTH}
        >
          <Mountains
            angle={160}
            percent={60}
            moutainWidth={0}
            mountainHeight={20}
            background="#b4e4eb"
          />
        </GridElement>

        <GridElement
          id="moutains2"
          left={0}
          height={3}
          zIndex={2}
          bottom={GROUND_HEIGHT}
          width={GRID_WIDTH}
        >
          <Mountains
            angle={164}
            percent={72}
            moutainWidth={15}
            mountainHeight={30}
            background="#a5ccd0"
          />
        </GridElement>

        <GridElement
          id="castle"
          right={0}
          height={5}
          zIndex={2}
          bottom={GROUND_HEIGHT}
          width={2}
        >
          <Castle />
        </GridElement>

        <GridElement
          id="ground"
          left={0}
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
