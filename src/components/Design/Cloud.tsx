import styled from "styled-components";

export interface CloudProps {
  color?: string;
}

const cloud1 = (color: string) => `
  radial-gradient(50px 50px at 25px calc(50% + 55px), ${color} 50%, transparent 52%),
  radial-gradient(70px 70px at 65px calc(50% + 25px), ${color} 50%, transparent 52%),
  radial-gradient(40px 40px at 100px calc(50% + 45px), ${color} 50%, transparent 52%),
  radial-gradient(30px 30px at 105px calc(50% + 35px), ${color} 50%, transparent 52%),
  radial-gradient(40px 40px at 130px calc(50% + 55px), ${color} 50%, transparent 52%)
`;

export const Cloud = styled.div<CloudProps>`
  height: 100px;
  width: 180px;
  background-repeat: none;
  background: ${({ color }) => cloud1(color || "#fff")};
`;
