import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { useContext } from "react";
import GithubContext from "../store/github-data";
import { useEffect } from "react";
import classes from "../styles/Navbar.module.css";

function Navbar() {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout: logoutUser,
    isLoading,
  } = useAuth0();

  //  user object info
  //   {
  //   "sub": "google-oauth2|114277113934011740811",
  //   "given_name": "Pranav",
  //   "family_name": "Nandane",
  //   "nickname": "pranavnan612",
  //   "name": "Pranav Nandane",
  //   "picture": "https://lh3.googleusercontent.com/a/AEdFTp6Fl7HeG_4FsjkAgcbl1Jnzyy0ThRhRykM5RBAgbg=s96-c",
  //   "locale": "en",
  //   "updated_at": "2023-02-10T09:16:07.521Z"
  // }

  const isUser = isAuthenticated && user;

  const { login, logout } = useContext(GithubContext);

  useEffect(() => {
    if (isAuthenticated) {
      login();
    } else {
      logout();
    }
  }, [isAuthenticated]);

  function loginHandler() {
    loginWithRedirect();
  }
  function logoutHandler() {
    logoutUser();
  }
  const url = user && user.picture;

  return (
    <nav className={classes["nav-wrapper"]}>
      {isLoading && <span className={classes["text-imp"]}>Loading....</span>}
      {isUser && <img src={url} alt={user.name} />}
      {isUser && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {isUser
        ? !isLoading && (
            <button
              className={`${classes["action-logout"]}`}
              onClick={logoutHandler}
            >
              <BiLogOutCircle /> <span>Logout</span>
            </button>
          )
        : !isLoading && (
            <div className={classes["btn-text-icon"]}>
              <span className={classes["text-imp"]}>Please, login first</span>
              <button
                className={classes["login-button"]}
                onClick={loginHandler}
              >
                <div className={classes["icon-text"]}>
                  <AiOutlineUserAdd style={{ fontSize: "1.5rem" }} />
                  <span>Log In</span>
                </div>
              </button>
            </div>
          )}
    </nav>
  );
}

export default Navbar;
