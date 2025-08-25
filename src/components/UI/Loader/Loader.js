import { GridLoader } from "react-spinners";

const Loader = ({ message }) => {
  return (
    <div
      style={{
        margin: "auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridLoader color="#7064e5" />
      <h3>{message || "Please wait..."}</h3>
    </div>
  );
};

export default Loader;
