import styled, { keyframes } from "styled-components";

const color = "#6bbce2";

const hat = `
  radial-gradient(7px 7px at calc(50% + 33px) 22px, ${color} 49%, transparent 50%) no-repeat,
  linear-gradient(29deg, ${color} 60%, transparent 62%) calc(50% + 20px) 5px / 27px 20px no-repeat,
  radial-gradient(50px 50px at calc(50% - 5px) 25px, ${color} 49%, transparent 50%) 0px 0px / 100% 25px no-repeat
`;

const head = `
  radial-gradient(8px 8px at 50% 38px, ${color} 50%, transparent 50%) -8px,
  radial-gradient(8px 8px at 50% 38px, ${color} 50%, transparent 50%) 8px,
  radial-gradient(10px 10px at 50% 35px, ${color} 50%, transparent 50%) 8px,
  linear-gradient(to bottom, ${color} 100%, ${color} 100%) 50% 10px / 30px 34px no-repeat,
  radial-gradient(50px 50px at 50% 38px, ${color} 50%, transparent 50%),
  linear-gradient(${color} 49%, ${color} 50%) 50% 22px / 52px 18px no-repeat
`;

const body = `
  radial-gradient(50px 60px at 50% 30px, ${color} 50%, transparent 50%) 0 60px / 100% no-repeat
`;

const unanimatedHandsAndFeet = `
  radial-gradient(30px 30px at calc(50% - 15px) calc(50% + 15px), ${color} 50%, transparent 50%),
  radial-gradient(30px 30px at calc(50% + 15px) calc(50% + 15px), ${color} 50%, transparent 50%),
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% + 15px), ${color} 50%, transparent 50%),
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% + 15px), ${color} 50%, transparent 50%)
`;

const walk = keyframes`
  0% {
    background-position: 0 105px, 0 105px, 0 0, 0 0;
  }
  33% {
    background-position: 0 90px, 0 110px, 0 10px, 0 -10px;
  }
  66% {
    background-position: 0 110px, 0 90px, 0 -10px, 0 10px;
  }
  100% {
    background-position: 0 105px, 0 105px, 0 0, 0 0;
  }
`;

export const Loader = styled.div`
  width: 100px;
  height: 150px;
  position: absolute;
  top: calc(50% - 75px);
  background-repeat: no-repeat;
  background: ${hat}, ${head}, ${body};
  transform: scale(0.6);

  &:before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: ${unanimatedHandsAndFeet};
    background-position: 0 105px, 0 105px, 0 0, 0 0;
    background-size: 100% 60px, 100% 60px, 100% 100%, 100% 100%;
    background-repeat: no-repeat;
    animation: 0.5s ${walk} linear infinite;
  }
`;
