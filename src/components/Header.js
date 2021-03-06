import React, { useContext } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function Header() {
  const { user, firebase } = useContext(FirebaseContext);
  console.log({ user });

  const handleLogoutUser = () => {
    firebase.logout();
  };
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="React Hooks News" className="logo" />
        <NavLink to="/" className="header-title">
          Climbing News
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/" className="header-link">
          new
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">
          top
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">
          search
        </NavLink>
        {user && (
          <>
            <div className="divider">|</div>
            <NavLink to="/create" className="header-link">
              add link
            </NavLink>
          </>
        )}
      </div>
      <div className="flex">
        {user ? (
          <>
            <NavLink to="/profile" className="header-name">
              {user.displayName}
            </NavLink>
            {/* <div className="header-name">{user.displayName}</div> */}
            <div className="divider">|</div>
            <div className="header-button" onClick={handleLogoutUser}>
              logout
            </div>
          </>
        ) : (
          <NavLink to="/login" className="header-link">
            login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
