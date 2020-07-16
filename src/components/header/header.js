import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import './header.styles.scss';
//currentUser comes from reducer
const Header = ({ currentUser,hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            {/*SVG is a high performance image yet its size is really tiny*/}
            {/*"ReactComponent as xxx" is a special usage in React, see the link below*/}
            {/*https://create-react-app.dev/docs/adding-images-fonts-and-files/*/}
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
            ) : (
                <Link className='option' to='/signin'>SIGN IN</Link>
            )}
            <CartIcon />
        </div>
        {
            hidden ? null : (<CartDropdown />)
        }
    </div>
);
//this "state" comes from combinedReducer(to be specific)
//createStructuredSelector could combine all the Selector you're inputting
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);