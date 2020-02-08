import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import firebase, { FirebaseContext } from "../firebase";

import useAuth from "../components/Auth/useAuth";

import Header from "./Header";
import CreateLink from "./Link/CreateLink";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import SearchLinks from "./Link/SearchLinks";
import LinkList from "./Link/LinkList";
import LinkDetail from "./Link/LinkDetail";
import Profile from "./Link/Profile";

function App() {
  const user = useAuth();
  return (
    // <div style={{ margin: "0 auto", textAlign: "center" }}>
    //   <img style={{ height: "100vh" }} src="/logo.png" alt="Logo" />
    // </div>

    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
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
              <Route path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
