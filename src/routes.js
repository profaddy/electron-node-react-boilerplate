import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import UserManagaer from "./containers/UserManager/index";
import EntriesMnaager from "./containers/EntriesManager/index";
// import UserManger from "./containers/UserManager/UserManger"

export default (
  <Switch>
    <Route exact path="/" component={EntriesMnaager} />
    <Route exact path="/loggedin" component={LoggedInPage} />
    {/* <Route exact path="/user-manager" compoennt={UserManger} /> */}
  </Switch>
);
