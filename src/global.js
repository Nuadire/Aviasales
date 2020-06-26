import { createGlobalStyle } from "styled-components";
import { normalize } from 'styled-normalize'
import OpenSansBold from "./fonts/OpenSans-Bold.ttf";
import OpenSans from "./fonts/OpenSans-Regular.ttf";

function fontFace(name, src, fontWeight = "normal", fontStyle = "normal") {
  return `
  @font-face {
    font-family: '${name}';
        src: url(${src}) format('truetype');
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
  }`;
}

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${fontFace("Open Sans", OpenSans, 400)}
  ${fontFace("Open Sans", OpenSansBold, 600)}

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    background: #F3F7FA;;
  }
`;
