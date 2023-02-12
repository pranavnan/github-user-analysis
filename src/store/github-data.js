import React from "react";

const GithubContext = React.createContext({
  followers: [],
  repos: [],
  githubUser: [],
  requests: 60,
  error: {},
  searchUser: () => {},
  isLoading: "",
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

export default GithubContext;
