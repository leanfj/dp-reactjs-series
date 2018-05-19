import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//renderiza o componete App no elemento com ID root
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
