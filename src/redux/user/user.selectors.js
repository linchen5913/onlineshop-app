import { createSelector } from 'reselect';

//below is what we call "input" selector
const selectUser = state => state.user;

//the first parameter of createSelector is either an array of input selector, or you could put
//different input selector consequentially, seperated by comma, both way would work
//the second parameter is Output selector, which is what we wanna cache, is a function with output
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);

