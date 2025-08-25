import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const HTMLRootDiv = document.getElementById("root");
const ReactRoot = ReactDOM.createRoot(HTMLRootDiv);

ReactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
);
