import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Containers
import Home from "./Containers/Home/Home";
import Footer from "./Components/Footer/Footer";

// Addons
import { navigation } from "./Addons/vars";

// Operations
// import { readDataFromFireStore } from "./operations";

import "./App.css";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={navigation.home} exact component={Home} />
        <Redirect to={navigation.home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
