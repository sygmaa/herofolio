import styled from "styled-components";

export const Warning = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  border: 2px solid #333;
  font-style: normal;
  color: #333;

  &:before {
    content: "!";
    font-size: 1.6;
  }
`;
