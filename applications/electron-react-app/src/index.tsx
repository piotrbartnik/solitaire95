import React from "react";
import ReactDOM from "react-dom";
import { Solitaire95 } from "solitaire95";
import { Bio } from "author-bio";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Solitaire95 aboutChildren={<Bio />} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
