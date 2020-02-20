import React, { useState } from "react";
import styled from "styled-components";
import { Warning } from "../Design/Icons/Warning";
import { MEDIA } from "../../constants";
import Modal from "../Modal";

export const AboutButton = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  bottom: 30px;
  padding: 10px 20px 10px 15px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  border: none;
  transition: box-shadow 0.3s ease;

  ${MEDIA.MIN_S} {
    right: 30px;
  }

  ${MEDIA.MAX_S} {
    padding: 10px 15px;
    left: 15px;
    bottom: 15px;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  }

  p {
    margin-left: 7px;
    line-height: 22px;

    ${MEDIA.MAX_S} {
      display: none;
    }
  }
`;

const About = () => {
  const [showPopin, setShowPopin] = useState(false);

  return (
    <>
      <AboutButton aria-label="About" onClick={() => setShowPopin(true)}>
        <Warning />
        <p>About</p>
      </AboutButton>

      <Modal onClose={() => setShowPopin(false)} show={showPopin}>
        <h3>The technical story of Herofolio</h3>
        <p>
          I'm a passionate looking for challenges. So, I wanted to follow some
          rules during the conception.
        </p>
        <ul>
          <li>
            This website is developed with React JS. No videogame engine like
            PIXI was used. You can see the codebase <a href="http://">here</a>
          </li>
          <li>
            All illustrations (shapes, characters, icons,...) are PURE CSS.
            Absolutey zero image or SVG was used.
          </li>
          <li>
            Each illustration, taken seprately (for example, the hero), are a{" "}
            single HTML element. It use mostly CSS gradients, and{" "}
            pseudo-elements, before/after.
          </li>
          <li>Animations are PURE CSS</li>
        </ul>
      </Modal>
    </>
  );
};

export default About;
