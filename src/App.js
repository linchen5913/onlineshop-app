import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import { createStructuredSelector } from 'reselect';

import './App.css';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shopPage/shop';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';




class App extends React.Component{

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth) {
        //because createUserProfileDocument() would return the ref itself(after checking if the user exist)
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          //snapShot is an object with id, exists properties(and additional data)
          //to see what our user looks like(name, email, createAt), we have to call snapShot.data()
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        })
      }else{
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    /* auth.onAuthStateChanged is a listener, so we don't call it directly
    and after we assign it to this.unsubscribeFromAuth, the return value of auth.onAuthStateChanged is actually a method
    called firebase.Unsubscribe, that's why we call it in componentWillUnmount to clean up the memory*/
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInAndSignUpPage />
                )
            }
          />
        </Switch>
      </div>
    );
    }
  }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  })

export default connect(mapStateToProps,mapDispatchToProps)(App);
