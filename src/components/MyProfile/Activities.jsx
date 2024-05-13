import React from "react";
import ActivityCard from "../ActivityCard";

const Activities = () => {
  return (
    <>
      {"abcedfg".split("").map((item, index) => {
        return <ActivityCard index={index} />;
      })}
    </>
  );
};

export default Activities;