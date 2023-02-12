import React, { useContext } from "react";
import GithubContext from "../../store/github-data";
import { MdBusiness, MdLocationOn, MdLinkOff } from "react-icons/md";
import classes from "../../styles/UserInfo.module.css";

function UserInfo() {
  const { githubUser } = useContext(GithubContext);

  const {
    avatar_url,
    html_url,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username,
  } = githubUser;

  return (
    <section className={classes["section-wrapper"]}>
      <header>
        <img src={avatar_url} alt={name} />
        <div className={classes.name_twitter}>
          <h4>{name || "No Name"}</h4>
          <p>@{twitter_username || "twitter account not set"}</p>
        </div>
        <a target="_blank" href={html_url}>
          Follow
        </a>
      </header>

      <p className={classes.bio}>{bio}</p>

      <div className={classes.links}>
        <p>
          <MdBusiness className={classes.symbol} /> {company || "Self"}
        </p>
        <p>
          <MdLocationOn className={classes.symbol} />{" "}
          {location || "Somewhere on Earth"}
        </p>
        <a href={`https://${blog}`}>
          <MdLinkOff className={classes.symbol} />
          {blog}
        </a>
      </div>
    </section>
  );
}

export default UserInfo;
