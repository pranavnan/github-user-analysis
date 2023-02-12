import React from "react";
import FollowerInfo from "./FollowerInfo";
import UserInfo from "./UserInfo";
import classes from "../../styles/Profile.module.css";

function User() {
  return (
    <section className="section">
      <div className={`section-center ${classes["wrapper-div"]}`}>
        <UserInfo />
        <FollowerInfo />
      </div>
    </section>
  );
}

export default User;
