import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import SignIn from "layouts/SignIn";

const hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route path="/admin/signin" component={SignIn} />
          <Route path="/admin" component={Admin} />
          <Route path="/rtl" component={RTL} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    );
  }
}

export default App;
