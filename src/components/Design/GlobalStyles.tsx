import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #a7eeff;
    font-family: 'PT Mono', monospace;
  }

  p {
    margin: 0;
    padding: 0;
  }

  button {
    font-size: 16px;
    font-family: "PT Mono", monospace;
    cursor: pointer;
  }
`;
