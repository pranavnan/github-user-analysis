import React, { useContext } from "react";
import GithubContext from "../store/github-data";
import classes from "../styles/Info.module.css";
import { GoRepo, GoGist } from "react-icons/go";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import InfoRender from "./InfoRender";

function Info() {
  const contextData = useContext(GithubContext);

  const { public_repos, followers, following, public_gists } =
    contextData.githubUser;

  const items = [
    {
      id: 1,
      icon: <GoRepo className="icon" />,
      label: "Repos",
      value: public_repos,
      color: "pink-bg",
    },
    {
      id: 2,
      icon: <FiUsers className="icon" />,
      label: "Followers",
      value: followers,
      color: "green-bg",
    },
    {
      id: 3,
      icon: <FiUserPlus className="icon" />,
      label: "Following",
      value: following,
      color: "purple-bg",
    },
    {
      id: 4,
      icon: <GoGist className="icon" />,
      label: "Gists",
      value: public_gists,
      color: "yellow-bg",
    },
  ];

  return (
    <section className="section">
      <div className={`section-center ${classes["section-wrapper"]}`}>
        {items.map((item) => (
          <InfoRender key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Info;
/*     githubUser data:->
  "login",  "id",  "node_id",  "avatar_url",  "gravatar_id",  "url",  "html_url",  followers_url",  "following_url",  "gists_url" ,  "starred_url",  "subscriptions_url"
  "organizations_url"  "repos_url"  "events_url"  "received_events_url"  "type"  "site_admin"  "name"  "company"  "blog"  "location"  "email"  "hireable"  "bio"  twitter_username"  "public_repos"  "public_gists"  "followers"  "following"  "created_at"  "updated_at"
  */
