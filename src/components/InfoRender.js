import React from "react";
import classes from "../styles/InfoRender.module.css";

function InfoRender({ icon, label, value, color }) {
  return (
    <article className={classes.item}>
      <span className={classes[color]}>{icon}</span>
      <div className={classes["heading-label"]}>
        <h3 className={classes["value-heading"]}>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
}

export default InfoRender;
