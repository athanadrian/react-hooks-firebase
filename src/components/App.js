import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./Header";
import CreateLink from "./Link/CreateLink";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import SearchLinks from "./Link/SearchLinks";
import LinkList from "./Link/LinkList";
import LinkDetail from "./Link/LinkDetail";

function App() {
  return (
    // <div style={{ margin: "0 auto", textAlign: "center" }}>
    //   <img style={{ height: "100vh" }} src="/logo.png" alt="Logo" />
    // </div>

    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="route-container">
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/new/1" />} />
            <Route path="/create" component={CreateLink} />
            <Route path="/login" component={Login} />
            <Route path="/forgot" component={ForgotPassword} />
            <Route path="/search" component={SearchLinks} />
            <Route path="/top" component={LinkList} />
            <Route path="/new/:page" component={LinkList} />
            <Route path="/link/:linkId" component={LinkDetail} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
