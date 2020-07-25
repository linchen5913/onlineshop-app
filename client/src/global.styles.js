import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body{
    font-family: 'Open Sans Condensed';
    padding: 20px 60px;

    @media screen and (max-width: 800px){
        padding: 10px;
    }
}
a {
    /*remove the weired default color and underline of all the "a" tags, since we'll only use "a" tags as links*/
    text-decoration: none;
    color:black;
}
* {
    box-sizing: border-box;
}
`;