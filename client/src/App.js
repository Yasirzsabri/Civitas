import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import UserLevelTable from './components/users/UserLevelTable';
import UserTable from './components/users/UserTable';
import CommunityTable from './components/screens/CommunityTable';
import MemberTable from './components/screens/MemberTable';
import AuthenticationProvider from './AuthenticationProvider'


const App = () => {
  
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
        </Switch>
      </Router>
     </AuthenticationProvider>
    </>
  );
};

export default App;