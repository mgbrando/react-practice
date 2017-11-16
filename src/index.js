const css = require("./app.scss");

import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <h1 className="title"> Hello World! </h1>
      <p>Testing rendering with jsx</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
