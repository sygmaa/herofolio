import React, { useState } from "react";
import styled from "styled-components";
import { Warning } from "../Design/Icons/Warning";
import { MEDIA } from "../../constants";
import Modal from "../Modal";
import { Close } from "../Design/Icons/Close";
import { BrickBg } from "../Design/BrickBg";

export const AboutButton = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  bottom: 20px;
  padding: 10px 20px 10px 15px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  border: none;
  transition: box-shadow 0.3s ease;
  left: 15px;
  bottom: 15px;

  ${MEDIA.MAX_S} {
    bottom: inherit;
    top: 15px;
    padding: 10px 15px 10px 15px;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  }

  p {
    font-family: "PT Mono", sans-serif;
    margin-left: 7px;
    line-height: 22px;

    ${MEDIA.MAX_S} {
      display: none;
    }
  }
`;

const CloseUi = styled(Close)`
  position: fixed;
  top: 20px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 20px 0 0 0;
  align-self: center;
  position: relative;
  color: #333;
  z-index: 2;
  text-align: center;
  letter-spacing: 1px;
`;

const Header = styled(BrickBg)`
  height: 5px;
  background: #feeb5a;
`;

const Content = styled.div`
  padding: 30px;

  font-family: "Montserrat", sans-serif;

  ul {
    list-style: none;
    margin: 20px 0 0 0;
    padding: 0;
  }

  li {
    padding: 0;
    padding-left: 20px;
    position: relative;

    &:before {
      content: "> ";
      position: absolute;
      left: 0;
    }

    &:not(:last-child) {
      padding-bottom: 20px;
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

      {showPopin && (
        <Modal
          onClose={() => setShowPopin(false)}
          style={{
            maxHeight: "400px",
          }}
        >
          <Header />
          <CloseUi
            color={"#fff"}
            size={4}
            aria-label="close"
            onClick={() => setShowPopin(false)}
          />
          <Title>The technical story of Herofolio</Title>
          <Content>
            <p>
              I'm looking for challenges. So, I wanted to follow some rules
              during the conception :
            </p>
            <ul>
              <li>
                All illustrations (shapes, characters, icons,...) are PURE CSS.
                Absolutely zero image or SVG was used.
              </li>
              <li>
                Each illustration, taken seprately (for example, the hero), are{" "}
                single HTML elements. It use mostly CSS gradients, and{" "}
                pseudo-elements, before/after.
              </li>
              <li>Elements are all animated with CSS transition property.</li>
              <li>
                This website is developed with React and Typescript. No
                videogame engine like PIXI was used. You can see the codebase{" "}
                <a href="http://">here</a>
              </li>
            </ul>
          </Content>
        </Modal>
      )}
    </>
  );
};

export default About;
