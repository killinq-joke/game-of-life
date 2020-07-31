import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Game from "./Game"
import Rules from "./Rules";

const App = () => {
   return (
    <>
      <Switch>

      <Route exact path="/" component={Game} />
      <Route path="/rules" component={Rules} />
      </Switch>
    
     
    </>
  );
};

export default App;
