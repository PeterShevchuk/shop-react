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

// Components
import AddItem from "./Components/AddItem/AddItem";
import Shop from "./Containers/Shop/Shop";
import SaleProducts from "./Components/SaleProducts/SaleProducts";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Cart from "./Components/Cart/Cart";
import ERROR from "./Containers/ERROR/ERROR";
import ItemsDetails from "./Components/ItemsDetails/ItemsDetails";

// Addons
import { navigation, upDateDataTime } from "./Addons/vars";
import { getItems } from "./operations";
import { setUpDate } from "./Redux/Slice";

import "./App.css";

function App() {
  const { token } = useSelector((state) => state.session);
  const { loader } = useSelector((state) => state.global);
  const { upDate } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const ProtectedRoute = ({ component: Component, ...rest }) => <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: props.location } }} />)} />;
  useEffect(() => {
    const dateNow = Date.now();
    if (upDate <= dateNow) {
      dispatch(getItems());
      dispatch(setUpDate(dateNow + upDateDataTime));
    }
  }, [dispatch, upDate]);
  return (
    <>
      <ERROR></ERROR>
      {loader && (
        <div className="loader">
          <Loader type="Puff" color="#00BFFF" height={300} width={300} />
        </div>
      )}
      <Header />
      <Switch>
        <Route path={navigation.home} exact component={Home} />
        <Route path={navigation.shop} exact component={Shop} />
        <Route path={navigation.cart} exact component={Cart} />
        <Route path={navigation.sale} exact component={SaleProducts} />
        <Route path={navigation.featured} exact component={FeaturedProducts} />
        <Route path={navigation.prof + "/:id"} component={ProfileID} />
        <Route path={navigation.shop + "/:id"} component={ItemsDetails} />
        <ProtectedRoute path={navigation.prof} exact component={Profile} />
        {!token && (
          <>
            <Route path={navigation.login} component={Login} />
            <Route path={navigation.reg} component={Registration} />
          </>
        )}
        <ProtectedRoute path={navigation.addItem} component={AddItem} />
        <Redirect to={navigation.home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
