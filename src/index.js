import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const HTMLRootDiv = document.getElementById("root");
const ReactRoot = ReactDOM.createRoot(HTMLRootDiv);

ReactRoot.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
