import React, { useContext, useState } from "react";
import GithubContext from "../store/github-data";
import { MdSearch } from "react-icons/md";
import classes from "../styles/Search.module.css";

function Search() {
  const [user, setUser] = useState("");
  const { isAuthenticated, requests, error, searchUser, isLoading } =
    useContext(GithubContext);

  function submitHandler(e) {
    e.preventDefault();
    if (user) {
      searchUser(user);
    }
    setUser("");
  }

  return (
    <section className="section">
      <div className={`section-center ${classes["wrapper-div"]}`}>
        {/* Show error if user didn't exists of requests over */}
        {error.show && (
          <div className={classes["error-wrapper"]}>
            <p>{error.msg}</p>
          </div>
        )}

        {/* Form Control */}

        <form onSubmit={submitHandler}>
          <div className={classes["form-control"]}>
            <MdSearch />

            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter Github Username"
            />

            {
              /*requests > 0 && !isLoading && */ <button
                className={!isAuthenticated ? "btn-disabled" : ""}
                disabled={!isAuthenticated}
              >
                search
              </button>
            }
          </div>
        </form>
        <h3>requests: {requests} / 60</h3>
      </div>
    </section>
  );
}

export default Search;
