import React from 'react';

import { CartItemContainer, CartItemImg, ItemDetailsContainer, NameContainer} from './cart-item.styles';


const CartItem = ({ item: { imageUrl, price, name,quantity } }) => (
    <CartItemContainer>
        <CartItemImg src={imageUrl} alt='item' />
        <ItemDetailsContainer>
            <NameContainer >{name}</NameContainer>
            <span>{quantity} x ${price}</span>
        </ItemDetailsContainer>
    </CartItemContainer>
)

export default CartItem