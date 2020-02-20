import React, { ReactNode } from "react";
import styled from "styled-components";
import { BrickBg } from "./BrickBg";

export const CaseSquare = styled(BrickBg)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  color: #fff;
`;

const Position = styled.div`
  font-family: "VT323", monospace;
  text-align: center;
  transition: bottom 0.2s ease;
`;

const Text = styled.div`
  position: absolute;
  margin-top: -2.2rem;
  color: #b42e25;
  text-shadow: 0px 1px 0px #fff;
  font-size: 2rem;
`;

export interface CaseProps {
  children: ReactNode;
}

const Case = ({ children }: CaseProps) => {
  return (
    <Position>
      <Text>{children}</Text>
      <CaseSquare></CaseSquare>
    </Position>
  );
};

export default Case;
