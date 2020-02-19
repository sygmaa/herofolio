import styled, { css } from "styled-components";

const camel = "#e5c56c";
const shoes = "#7c5e5e";
const beige = "#ffe1af";

const hat = `
  radial-gradient(7px 7px at calc(50% + 33px) 22px, gray 49%, transparent 50%) no-repeat,
  linear-gradient(29deg, gray 60%, transparent 62%) calc(50% + 20px) 5px / 27px 20px no-repeat,
  radial-gradient(50px 50px at calc(50% - 5px) 25px, grey 49%, transparent 50%) 0px 0px / 100% 25px no-repeat
`;

const head = `
  radial-gradient(8px 8px at 50% 38px, ${beige} 48%, transparent 50%) -8px,
  radial-gradient(8px 8px at 50% 38px, ${beige} 48%, transparent 50%) 8px,
  radial-gradient(10px 10px at 50% 35px, black 48%, transparent 50%) -8px,
  radial-gradient(10px 10px at 50% 35px, black 48%, transparent 50%) 8px,
  linear-gradient(to bottom, ${beige} 100%, ${beige} 100%) 50% 10px / 30px 34px no-repeat,
  radial-gradient(30px 30px at 50% 42px, white 48%, transparent 50%),
  radial-gradient(50px 50px at 50% 38px, ${beige} 48%, transparent 50%),
  linear-gradient(black 49%, black 50%) 50% 22px / 52px 18px no-repeat
`;

const body = `
  radial-gradient(50px 60px at 50% 30px, ${camel} 49%, transparent 50%) 0 60px / 100% no-repeat
`;

const unanimatedHandsAndFeet = `
  radial-gradient(30px 30px at calc(50% - 15px) calc(50% + 15px), ${shoes} 47%, transparent 50%) 0 120px / 100% 30px no-repeat,
  radial-gradient(30px 30px at calc(50% + 15px) calc(50% + 15px), ${shoes} 47%, transparent 50%) 0 120px / 100% 30px no-repeat,
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% + 15px), ${beige} 47%, transparent 50%),
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% + 15px), ${beige} 47%, transparent 50%)
`;

const jumpingHandsAndFeet = `
  radial-gradient(30px 30px at calc(50% + 10px) calc(50%), ${shoes} 47%, transparent 50%) calc(50% + 30px) 110px / 30px 30px no-repeat,  
  radial-gradient(30px 30px at calc(50% - 10px) calc(50%), ${shoes} 47%, transparent 50%) calc(50% - 30px) 110px / 30px 30px no-repeat,
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% - 20px), ${beige} 47%, transparent 50%),
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% - 20px), ${beige} 47%, transparent 50%)
`;

const animatedFeetBefore1 = `
  radial-gradient(30px 30px at calc(50% - 10px) 50%, ${shoes} 47%, transparent 50%) calc(50% - 5px) 115px / 100% 30px no-repeat,
  radial-gradient(30px 30px at calc(50% - 10px) 50%, ${shoes} 47%, transparent 50%) calc(50% + 25px) 135px / 100% 30px no-repeat
`;

const animatedFeetBefore2 = `
  radial-gradient(30px 30px at calc(50% - 10px) 50%, ${shoes} 47%, transparent 50%) calc(50% - 5px) 135px / 100% 30px no-repeat,
  radial-gradient(30px 30px at calc(50% - 10px) 50%, ${shoes} 47%, transparent 50%) calc(50% + 25px) 135px / 100% 30px no-repeat
`;

const animatedFeetBefore3 = `
  radial-gradient(30px 30px at calc(50% - 10px) 50%, ${shoes} 47%, transparent 50%) calc(50% - 5px) 135px / 100% 30px no-repeat,
  radial-gradient(30px 30px at calc(50% - 10px) 50%, ${shoes} 47%, transparent 50%) calc(50% + 25px) 115px / 100% 30px no-repeat
`;

const animatedHandsAfter1 = `
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% + 15px), ${beige} 47%, transparent 50%) 0 10px,
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% + 15px), ${beige} 47%, transparent 50%) 0 -10px
`;

const animatedHandsAfter2 = `
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% + 15px), ${beige} 47%, transparent 50%) 0 0,
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% + 15px), ${beige} 47%, transparent 50%) 0 0
`;

const animatedHandsAfter3 = `
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% + 15px), ${beige} 47%, transparent 50%) 0 -10px,
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% + 15px), ${beige} 47%, transparent 50%) 0 10px
`;

export interface HeroProps {
  isWalking: boolean;
  isJumping: boolean;
}

export const Hero = styled.div<HeroProps>`
  width: 100px;
  height: 150px;
  position: absolute;
  bottom: 0;
  background-repeat: no-repeat;
  transition: all 0.2s linear;
  background: ${hat}, ${head}, ${body};

  @keyframes animatedHeroHands {
    0% {
      background: ${animatedHandsAfter2};
    }
    25% {
      background: ${animatedHandsAfter1};
    }
    50% {
      background: ${animatedHandsAfter2};
    }
    75% {
      background: ${animatedHandsAfter3};
    }
    100% {
      background: ${animatedHandsAfter2};
    }
  }

  @keyframes animatedHero {
    0% {
      background: ${animatedFeetBefore2};
    }
    25% {
      background: ${animatedFeetBefore1};
    }
    50% {
      background: ${animatedFeetBefore2};
    }
    75% {
      background: ${animatedFeetBefore3};
    }
    100% {
      background: ${animatedFeetBefore2};
    }
  }

  &:before, &:after {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &:before {
    ${({ isWalking, isJumping }) =>
      !isWalking &&
      !isJumping &&
      css`
        background: ${unanimatedHandsAndFeet};
      `}

    ${({ isJumping }) =>
      isJumping &&
      css`
        background: ${jumpingHandsAndFeet};
      `}      

    ${({ isWalking, isJumping }) =>
      isWalking &&
      !isJumping &&
      css`
        animation: 0.2s linear infinite animatedHero;
      `}
  }

  &:after {
    ${({ isWalking, isJumping }) =>
      !isWalking &&
      !isJumping &&
      css`
        background: ${unanimatedHandsAndFeet};
      `}

    ${({ isWalking, isJumping }) =>
      isWalking &&
      !isJumping &&
      css`
        animation: 0.2s linear infinite animatedHeroHands;
      `}
  }
`;
