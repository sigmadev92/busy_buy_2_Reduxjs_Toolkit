import React from "react";

const PlusIcon = ({ handleAdd }) => {
  return (
    <img
      onClick={handleAdd}
      src="https://png.pngtree.com/png-vector/20231017/ourmid/pngtree-symbol-of-blue-plus-concept-on-white-background-a-plus-png-image_10272013.png"
      alt="plus"
      style={{ width: "30px" }}
    />
  );
};

export default PlusIcon;
