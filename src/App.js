import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from './Navbar/Navbar';
import Performance from './Performance/Performance';
import Promotions from './Promotions/Promotions';
import CreatePromotion from './Promotions/CreatePromotion';
import CreateGiftDeal from './Promotions/CreateGiftDeal';
import Messages from './Messages/Messages';
import Profile from './Profile/Profile';

// import {PromotionsData} from './Promotions/PromotionsData';
function App() {
  // localStorage.setItem("promotions", JSON.stringify(PromotionsData));
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route exact path="/">
        <Redirect to="/promotions" />
      </Route>
      <Route path="/performance">
        <Performance />
      </Route>
      <Route exact path="/promotions">
        <Promotions />
      </Route>
      <Route path="/messages">
        <Messages />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route exact path="/promotions/gift-deal/:id">
        <CreateGiftDeal />
      </Route>
      <Route path="/promotions/:id">
        <CreatePromotion />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
