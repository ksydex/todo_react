import React from "react";
import ReactDOM from "react-dom";
import Home from "./views/Home.js";

it("Отрисовывает без ошибки", () => {
  const rootElement = document.createElement("div");
  ReactDOM.render(<Home />, rootElement);
});
