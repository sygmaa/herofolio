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

export interface CaseProps {
  children: ReactNode;
}

const Case = ({ children }: CaseProps) => {
  return (
    <Position>
      <div>{children}</div>
      <CaseSquare></CaseSquare>
    </Position>
  );
};

export default Case;
