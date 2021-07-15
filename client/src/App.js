import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import UserLevelTable from './components/users/UserLevelTable';
import UserTable from './components/users/UserTable';
import CommunityTable from './components/screens/CommunityTable';
import MemberTable from './components/screens/MemberTable';
import AuthenticationProvider from './AuthenticationProvider'
import React, { useState, useEffect } from 'react';
import Pay from './Pay';

const App = () => {
  // const [isLoad, setLoad] = useState(false);
  // useEffect(() => {
  //   let sqPaymentScript = document.createElement("script");
  //   // sandbox: https://js.squareupsandbox.com/v2/paymentform
  //   // production: https://js.squareup.com/v2/paymentform
  //   sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
  //   sqPaymentScript.type = "text/javascript";
  //   sqPaymentScript.async = false;
  //   sqPaymentScript.onload = () => {
  //     setLoad(true);
  //   };
  //   document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  // });

  // const squarePayment = isLoad ? (
  //       <Square paymentForm={ window.SqPaymentForm }/>
  //   ) : (
  //      null
  //   )
  
  return (
    <>
     <AuthenticationProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home/>            
          </Route>
          
          <Route path='/user-level'>
            <UserLevelTable/>
          </Route>
          <Route path='/users'>
            <UserTable/>
          </Route>
          <Route path='/communities'>
            <CommunityTable/>
          </Route>
          <Route path='/members'>
            <MemberTable/>
          </Route>
          <Route path='/Pay'>
            <Pay/>
          </Route>
        </Switch>
      </Router>
     </AuthenticationProvider>
    </>
  );
};

export default App;