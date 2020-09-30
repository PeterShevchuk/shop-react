import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "react-loader-spinner";

// Containers
import Home from "./Containers/Home/Home";
import Login from "./Containers/Login/Login";
import Registration from "./Containers/Registration/Registration";
import Profile from "./Containers/Profile/Profile";
import ProfileID from "./Containers/ProfileID/ProfileID";
import ERROR from "./Containers/ERROR/ERROR";

// Components
import AddItem from "./Components/AddItem/AddItem";
import Shop from "./Containers/Shop/Shop";
import SaleProducts from "./Components/SaleProducts/SaleProducts";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Cart from "./Components/Cart/Cart";

// Addons
import { navigation } from "./Addons/vars";
import { getItems } from "./operations";

import "./App.css";

function App() {
  const { token, user } = useSelector((state) => state.session);
  const { loader } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const ProtectedRoute = ({ component: Component, ...rest }) => <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: props.location } }} />)} />;
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  return (
    <>
      {loader && (
        <div className="loader">
          <Loader type="Puff" color="#00BFFF" height={300} width={300} />
        </div>
      )}
      <Header />
      <Switch>
        <Route path={navigation.home} exact component={Home} />
        <Route path={navigation.shop} exact component={Shop} />
        <Route path={navigation.sale} exact component={SaleProducts} />
        <Route path={navigation.featured} exact component={FeaturedProducts} />
        <Route path={navigation.cart} exact component={Cart} />
        <Route path={navigation.addItem} component={token && user.admin ? AddItem : ERROR} />
        {!token && (
          <>
            <Route path={navigation.login} component={Login} />
            <Route path={navigation.reg} component={Registration} />
          </>
        )}
        <ProtectedRoute path={navigation.prof} exact component={Profile} />
        <Route path={navigation.prof + "/:id"} component={ProfileID} />
        <Redirect to={navigation.home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
