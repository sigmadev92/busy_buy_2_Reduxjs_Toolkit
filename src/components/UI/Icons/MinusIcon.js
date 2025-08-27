import React from "react";

const MinusIcon = ({ handleRemove }) => {
  return (
    <img
      onClick={handleRemove}
      src="https://cdn-icons-png.flaticon.com/512/6374/6374493.png"
      style={{ width: "30px" }}
      alt="minus"
    />
  );
};

export default MinusIcon;
