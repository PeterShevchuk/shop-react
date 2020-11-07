import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Containers
import Home from "./Containers/Home/Home";
import Login from "./Containers/Login/Login";
import Registration from "./Containers/Registration/Registration";
import Profile from "./Containers/Profile/Profile";
import ProfileID from "./Containers/ProfileID/ProfileID";

// Components
import Shop from "./Containers/Shop/Shop";
import SaleProducts from "./Components/SaleProducts/SaleProducts";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Cart from "./Components/Cart/Cart";
import ERROR from "./Containers/ERROR/ERROR";
import ItemsDetails from "./Components/ProductItem/ItemsDetails/ItemsDetails";
import Loading from "./Components/Loader/Loader";
import Success from "./Components/Success/Success";
// import Modal from "./Components/Modal/Modal";
import Admin from "./Containers/Admin/Admin";

// Addons
import { navigation, upDateDataTime } from "./Addons/vars";
import { getItems, getSliderArray } from "./operations";
import { setLoader, setUpDate } from "./Redux/Slice";

import "./App.css";

function App() {
  const { token, user } = useSelector((state) => state.session);
  const { upDate } = useSelector((state) => state.data);
  const location = useLocation();
  const dispatch = useDispatch();
  const RouteReg = ({ component: Component, ...rest }) => <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to={{ pathname: navigation.redirect, state: { from: props.location } }} />)} />;
  // const RouteAdrm = ({ component: Component, ...rest }) => <Route {...rest} render={(props) => (user.admin ? <Component {...props} /> : <Redirect to={{ pathname: navigation.redirect, state: { from: props.location } }} />)} />;
  const RouteNoReg = ({ component: Component, ...rest }) => <Route {...rest} render={(props) => (!token ? <Component {...props} /> : <Redirect to={{ pathname: navigation.redirect, state: { from: props.location } }} />)} />;
  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 2000);
    const dateNow = Date.now();
    if (upDate <= dateNow) {
      dispatch(getItems());
      dispatch(getSliderArray());
      dispatch(setUpDate(dateNow + upDateDataTime));
    }
  }, [dispatch, upDate]);
  return (
    <>
      {location.pathname.slice(0, 6) === navigation.admin && token && user.admin ? (
        <Switch>
          <Route path={navigation.admin} component={Admin} />
          {/* <Redirect to={navigation.redirect} /> */}
        </Switch>
      ) : (
        <>
          {/* <Modal /> */}
          <ERROR />
          <Loading />
          <Success />
          <Header />
          <Switch>
            <Route path={navigation.home} exact>
              <Home />
            </Route>
            <Route path={navigation.shop} exact component={Shop} />
            <Route path={navigation.cart} exact component={Cart} />
            <Route path={navigation.sale} exact component={SaleProducts} />
            <Route path={navigation.featured} exact component={FeaturedProducts} />
            <Route path={navigation.prof + "/:id"} component={ProfileID} />
            {/* <RouteAdrm path={navigation.admin} component={Admin} /> */}
            <Route path={navigation.shop + "/:id"} component={ItemsDetails} />
            <RouteReg path={navigation.prof} exact component={Profile} />
            <RouteNoReg path={navigation.login} component={Login} />
            <RouteNoReg path={navigation.reg} component={Registration} />
            <Redirect to={navigation.redirect} />
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
