import React, { useContext } from "react";
import ReposAnalysis from "./charts/ReposAnalysis";
import Info from "./Info";
import Navbar from "./Navbar";
import Search from "./Search";
import Profile from "./userinfo/Profile";
import loadingSpinner from "../images/transparent-spinner.gif";
import GithubContext from "../store/github-data";

function Dashboard() {
  const { isLoading } = useContext(GithubContext);
  return (
    <>
      <Navbar />
      <Search />
      {isLoading && (
        <img
          src={loadingSpinner}
          alt="loading spinner image"
          className="loading-img"
        />
      )}
      {!isLoading && (
        <>
          <Info />
          <Profile />
          <ReposAnalysis />
        </>
      )}
    </>
  );
}

export default Dashboard;
