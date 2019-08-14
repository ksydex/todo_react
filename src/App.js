import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { HomeView, TaskView } from "./views";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentView: "Home",
      taskViewId: null
    };
  }

  setView = name => {
    this.setState({ currentView: name });
  };

  setTaskView = id => {
    this.setState({ taskViewId: id }, () => this.setView("TaskView"));
  };

  render() {
    const { currentView, taskViewId } = this.state;

    return (
      <div className="main-view">
        {currentView === "Home" && <HomeView setTaskView={this.setTaskView} />}
        {currentView === "TaskView" && <TaskView taskId={taskViewId} />}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
