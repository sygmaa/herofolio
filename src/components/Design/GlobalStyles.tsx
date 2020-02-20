import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    background: #a7eeff;
    font-family: 'PT Mono', monospace;
    font-size: 1.6rem;
    min-width: 300px;
  }

  p {
    margin: 0;
    padding: 0;
  }

  button {
    font-size: 1.6rem;
    font-family: "PT Mono", monospace;
    cursor: pointer;
  }
`;
