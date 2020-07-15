import { createSelector } from 'reselect';
//input selector ; output selector

//input selector
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart=>cart.cartItems
)

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((initialValue, cartItem) => initialValue + cartItem.quantity, 0)
)