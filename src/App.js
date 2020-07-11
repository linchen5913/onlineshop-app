import React from 'react';
import {Switch, Route} from 'react-router-dom'; 

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shopPage/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth) {
        //because createUserProfileDocument() would return the ref itself(after checking if the user exist)
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          //snapShot is an object with id, exists properties(and additional data)
          //to see what our user looks like(name, email, createAt), we have to call snapShot.data()
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        })
      }else{
        this.setState({currentUser:userAuth})
      }
    })
  }

  componentWillUnmount(){
    /* auth.onAuthStateChanged is a listener, so we don't call it directly
    and after we assign it to this.unsubscribeFromAuth, the return value of auth.onAuthStateChanged is actually a method
    called firebase.Unsubscribe, that's why we call it in componentWillUnmount to clean up the memory*/
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
