import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

import {SignInAndSignOutContainer } from './sign-in-and-sign-up.styles';


const SignInAndSignUpPage = () => (
    <SignInAndSignOutContainer>
        <SignIn />
        <SignUp />
    </SignInAndSignOutContainer>
)

export default SignInAndSignUpPage;