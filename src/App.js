import React from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Main from "./components/Main";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Main} />
        <Route path="/:id" component={MovieDetail} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
