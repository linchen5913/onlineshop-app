import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route,Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';


import { selectCurrentUser } from './redux/user/user.selectors';

import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';


import Spinner from './components/spinner/spinner';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
// import HomePage from './pages/homepage/homepage';
// import ShopPage from './pages/shopPage/shop';
// import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';
import ErrorBoundary from './components/error-boundary/error-boundary';
import { checkUserSession } from './redux/user/user.actions';
const HomePage = lazy(() => import('./pages/homepage/homepage'));
const ShopPage = lazy(() => import('./pages/shopPage/shop'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up'))


const App = ({ checkUserSession,currentUser }) => {
  useEffect(() => {
    checkUserSession()
  },[checkUserSession])

    return (
      <div>
        <GlobalStyle />
        <Header />
        <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInAndSignUpPage />
                )
            }
            />
          </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
