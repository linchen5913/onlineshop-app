//this {css} we imported allow us to write a block of css then reuse it somewhere else
//there's another property we could use we reuse our css by implement as='div' to mimic the behavior
import styled from 'styled-components';
import { Link } from 'react-router-dom';



//the HeaderContainer is just a "div", but next one is different
export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px){
        height:60px;
        padding: 10px;
        margin-bottom: 20px;
    }
`;

//this LogoContainer is transformed to "component"!! thanks to the syntax styled(component)
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

    @media screen and (max-width: 800px){
      width:50px;
      padding:0;
    }
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width: 800px){
        width:80%;
    }
`;

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`;

