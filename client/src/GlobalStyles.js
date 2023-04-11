import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
      --primary-color: #f95738;
      --secondary-color: #0d3b66;
      --background-color:#faf0ca;
      --background-color-darker:#f2e8c9;
      --color-1:#f95738;
      --color-2:#f95738;
 
    --rand-color0: #013a63;
--rand-color1: #014f86;
--rand-color2: #2a6f97;
--rand-color3: #2c7da0;
--rand-color4: #468faf;
--rand-color5: #f06292;
--rand-color6: #6d4c41;
--rand-color7: #9e9d24;


      --page-horizontal-padding: 20px;
      --header-height: 50px;
      --max-content-width: 1200px;
      --heading-font-family: 'Teko', sans-serif;
      --user-img-width: 120px;
      
    }

    @font-face {
        font-family: 'Lilita One';
        src: url('/fonts/LilitaOne-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Roboto Mono';
        src: url('/fonts/RobotoMono-VariableFont_wght.ttf') format('truetype');
        //variable font
        font-weight:  600;
        font-style: normal;
    }


        

    .wavesurfer-playback {
  display: none;
}

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        background-color: var(--background-color);
        font-family: 'Teko', sans-serif;
        scrollbar-width: none;
    -ms-overflow-style: none; 
    &::-webkit-scrollbar {
      display: none;
    }
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3 {
      color: var(--primary-color);
      font-family: var(--heading-font-family);
    }
    h2 {
      font-size: 28px;
      font-family: 'Lilita One', sans-serif;
    }
`;
