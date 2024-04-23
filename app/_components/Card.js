import React from "react";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";

const Card = ({ info }) => {
  return (
    <>
      <CardHeader info={info} />
      <CardMain info={info} />
    </>
  );
};

export default Card;
