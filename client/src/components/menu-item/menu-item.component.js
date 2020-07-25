import React from 'react';
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle
} from './menu-item.styles';
//withRouter is a HOC,we first import it and then wrap the current component in it
import { withRouter } from 'react-router-dom';

//because this MenuItem component is going to be put in the <Route />
//so it could get access to the match & history properties
const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => (
  <MenuItemContainer
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      imageUrl={imageUrl}
    />
    <ContentContainer>
      <ContentTitle>{title.toUpperCase()}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>
);
//by wrapping the MenuItem in withRouter HOC, we have the access to the history props and 
export default withRouter(MenuItem);