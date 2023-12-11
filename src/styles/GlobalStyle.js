import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --mainWhite: #fff;
    --mainBlack: #222;
    --mainOrange: #FF683B;
    --bgColor: #171717;
    --subColor: #252525;
    --neonColor: #D9FD79;
    --violetColor: #7270FF;
    --darkGrayColor: #2B2B2B;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
 
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  input, textarea{
    box-sizing: border-box;

  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  html{
    &::-webkit-scrollbar {
    width: 0;
  }
  html,body{
    position: relative;
    min-height: 100%;
    height: auto;
  }
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    line-height: 1;
    font-size: 1rem;
    background-color: var(--bgColor);
    color: var(--mainWhite);
    font-family: 'Roboto', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: white;
  }

  button {
    cursor: pointer;
    border: none;
  }

`;

export default GlobalStyles;
