import React, { useEffect, useState } from "react";
import GithubContext from "./github-data";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";
import mockUser from "./mockData.js/mockUser";

function GithubProvider(props) {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  // Error Toggling

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  async function searchUser(user) {
    toggleError();
    setIsLoading(true);
    try {
      const [userResponse, followersResponse, reposResponse] =
        await Promise.allSettled([
          fetch(`https://api.github.com/users/${user}`),
          fetch(`https://api.github.com/users/${user}/followers?per_page=100`),
          fetch(`https://api.github.com/users/${user}/repos?per_page=100`),
        ]);

      // console.log(userResponse, followersResponse, reposResponse);

      if (userResponse.value.ok) {
        const userData = await userResponse.value.json();
        setGithubUser(userData);
      } else {
        throw new Error("Username did'nt exist");
      }

      if (followersResponse.value.ok) {
        const followersData = await followersResponse.value.json();
        setFollowers(followersData);
      } else {
        throw new Error("Something went wrong");
      }

      if (reposResponse.value.ok) {
        const resposData = await reposResponse.value.json();
        setRepos(resposData);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      toggleError(true, e.message);
    }
    checkRequests();
    setIsLoading(false);
  }

  async function checkRequests() {
    try {
      const response = await fetch(`https://api.github.com/rate_limit`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      setRequests(responseData.rate.remaining);
      if (responseData.rate.remaining === 0) {
        throw new Error("sorry, you have exceeded your hourly rate limit!");
      }
    } catch (e) {
      toggleError(true, e.message);
    }
  }

  useEffect(() => {
    checkRequests();
    // searchUser("facebook");
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        isAuthenticated,
        login,
        logout,
        searchUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
}

export default GithubProvider;
