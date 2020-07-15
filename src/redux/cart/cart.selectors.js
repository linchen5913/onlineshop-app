import { createSelector } from 'reselect';
//input selector ; output selector

//input selector
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart=>cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((initialValue, cartItem) => initialValue + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (initialValue, cartItem) =>
                initialValue + cartItem.quantity * cartItem.price,
            0)
)