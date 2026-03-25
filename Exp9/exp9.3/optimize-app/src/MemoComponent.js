import React from "react";

const MemoComponent = React.memo(({ value }) => {
  console.log("Memo Component Rendered");
  return <h3>Memo Value: {value}</h3>;
});

export default MemoComponent;
