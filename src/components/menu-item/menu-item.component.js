import React from 'react';
import './menu-item.styles.scss';
//withRouter is a HOC,we first import it and then wrap the current component in it
import {withRouter} from 'react-router-dom';

//because this MenuItem component is going to be put in the <Route />
//so it could get access to the match & history properties
const MenuItem = ({ title,imageUrl,size, history,match,linkUrl }) => (
    <div 
      className={`${size} menu-item`} 
      onClick={() => history.push(`${match.url}${linkUrl}`)} 
    >
      <div 
        className='background-image' 
        style={{
          backgroundImage: `url(${imageUrl})`
        }} 
      />
         <div className='content'>
             <h1 className='title'>{title.toUpperCase()}</h1>
             <span className='subtitle'>SHOP NOW</span>
         </div>
    </div>
)
//by wrapping the MenuItem in withRouter HOC, we have the access to the history props and 
export default withRouter(MenuItem);