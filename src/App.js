import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout"
import Login from "./Login";
import Payment from "./Payment"
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"

const promise = loadStripe("pk_test_51I3SOJKCJDPtSimoBOOy2HJMAlRrZF2YS3bJGVg1z0T3iEKhuRe1oVkoPfF4naI1awRlsx4H4tx1XWAGMwIEWWOc00dQBNhorg");

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
  //will only run once 

  auth.onAuthStateChanged(authUser => {
    console.log("The user is", authUser)

    if (authUser) {
      //user just logged in / user was logged in

      dispatch({
        type: "SET_USER",
        user: authUser
      })
    } else {
      //the user is logged out
    dispatch({
      type: "SET_USER",
      user: null
    })
    }
  })
}, [])

  return (
    //BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />  
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />  
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />  
          </Route> 
        </Switch>
    </div>
    </Router>
  );
}

export default App;
