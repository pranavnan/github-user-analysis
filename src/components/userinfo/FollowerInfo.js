import React, { useContext } from "react";
import GithubContext from "../../store/github-data";
import classes from "../../styles/FollowerInfo.module.css";

function FollowerInfo() {
  const { followers } = useContext(GithubContext);

  return (
    <article className={classes["wrapper-article"]}>
      <div className={classes.followers}>
        {followers.map((follower, idx) => {
          const { avatar_url: img, html_url, login } = follower;

          return (
            <article key={idx}>
              <img src={img} alt={login} />

              <div className={classes.login_name}>
                <h4>{login}</h4>
                <a href={html_url} target="_blank">
                  {html_url}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </article>
  );
}

export default FollowerInfo;
