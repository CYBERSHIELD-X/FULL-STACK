import React from "react";

function HeavyComponent({ count }) {
  console.log("Heavy Component Rendered");

  return <h3>Heavy Count: {count}</h3>;
}

export default HeavyComponent;
