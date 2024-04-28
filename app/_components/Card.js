import React, { Fragment } from "react";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";

const Card = ({ info }) => {
  return (
    <div className="max-w-5xl mx-auto my-0">
      <CardHeader info={info} />
      <CardMain info={info} />
    </div>
  );
};

export default Card;
