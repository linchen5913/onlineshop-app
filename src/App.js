import React from 'react';
import {Switch, Route} from 'react-router-dom'; 

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shopPage/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth } from './firebase/firebase.utils';

import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      currentUser:null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    /* auth.onAuthStateChanged is a listener, so we don't call it directly
    and after we assign it to this.unsubscript, the return value of auth.onAuthStateChanged is actually a method
    called firebase.Unsubscribe, that's why we call it in componentWillUnmount to clean up the memory*/
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({ currentUser: user })
      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
    }
  }

export default App;
