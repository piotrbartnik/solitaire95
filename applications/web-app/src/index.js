import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Solitaire95 } from "solitaire95";
import { Bio } from "author-bio";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Solitaire95
      playSounds
      aboutChildren={<Bio />}
      preserveStateInLocalStorage={process.env.REACT_APP_CY_ENV !== "test"}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
