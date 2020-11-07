import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import AddItem from "../../Components/AdminPanel/AddItem/AddItem";
import AddSlider from "../../Components/AdminPanel/AddSlider/AddSlider";

import { navigation } from "../../Addons/vars";

import "./Admin.css";
const Admin = () => {
  return (
    <div className="admin">
      <div className="admin__container">
        <div>
          <List component="nav" className="navButton">
            <NavLink to={navigation.admin} exact>
              <ListItem button>Homes</ListItem>
            </NavLink>
            <NavLink to={navigation.addItem} exact>
              <ListItem button>ADD ITEM</ListItem>
            </NavLink>
            <NavLink to={navigation.addSlider} exact>
              <ListItem button>SLIDER</ListItem>
            </NavLink>

            <Divider />
            <NavLink to={navigation.home} exact>
              <ListItem button>To Site</ListItem>
            </NavLink>
          </List>
        </div>
        <main>
          <Switch>
            <Route path={navigation.addItem} exact component={AddItem} />
            <Route path={navigation.addSlider} exact component={AddSlider} />
            <Route path={navigation.admin} exact component={adminHome} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

const adminHome = () => {
  return <h1>ADMIN PANEL</h1>;
};

export default Admin;
