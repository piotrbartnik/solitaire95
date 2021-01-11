import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Solitaire95 } from "solitaire95";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Solitaire95 />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
