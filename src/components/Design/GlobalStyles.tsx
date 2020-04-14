import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
    min-width: 300px;
    user-select: none;
    touch-action: manipulation;
  }

  * {
    touch-action: manipulation;
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
