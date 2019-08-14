import React from "react";
import ReactDOM from "react-dom";
import { HomeView } from "./views";

it("Отрисовывает без ошибки", () => {
  const rootElement = document.createElement("div");
  ReactDOM.render(<HomeView />, rootElement);
});
