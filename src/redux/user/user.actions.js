import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

//action is a normal JS object
//it must consist of a "type", you could design the rest of the object(payload,etc.)
//normally, you should define the type in string CONSTANT so that it's easier to debug(for bigger project)