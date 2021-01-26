import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,600;1,400&display=swap');
    
    * {
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
        
    }
    body, html{
        background-color: #F2F4F4;
        color: #21232B;
        padding: 0px;
        margin: 0px;
    }
   
`;
export default Global;
