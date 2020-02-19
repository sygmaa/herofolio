import styled from "styled-components";

export const Info = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  right: 30px;
  bottom: 30px;
  padding: 10px 20px 10px 15px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  border: none;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  }

  p {
    margin-left: 7px;
    line-height: 22px;
  }
`;
