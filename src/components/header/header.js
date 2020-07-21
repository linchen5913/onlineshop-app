import React from 'react';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles';

//currentUser comes from reducer
const Header = ({ currentUser,hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            {/*SVG is a high performance image yet its size is really tiny*/}
            {/*"ReactComponent as xxx" is a special usage in React, see the link below*/}
            {/*https://create-react-app.dev/docs/adding-images-fonts-and-files/*/}
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {currentUser ? (
                <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
            ) : (
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            )}
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : (<CartDropdown />)
        }
    </HeaderContainer>
);
//this "state" comes from combinedReducer(to be specific)
//createStructuredSelector could combine all the Selector you're inputting
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);