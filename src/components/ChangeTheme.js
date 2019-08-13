import React from "react";

export default class ChangeTheme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTheme: false
    };
  }

  changeTheme = () => {
    this.setState({ currentTheme: !this.state.currentTheme });
    const dark = {
      text: "#ffffff",
      bg: "#131515"
    };
    const light = {
      text: "#131515",
      bg: "#ffffff"
    };
    const colors = this.state.currentTheme ? dark : light;

    let root = document.documentElement;
    root.style.setProperty("--text", colors.text);
    root.style.setProperty("--bg", colors.bg);
  };

  render() {
    const { currentTheme } = this.state;

    return (
      <div>
        <h1
          onClick={this.changeTheme}
          className="header color-accent"
          style={{ cursor: "pointer" }}
        >
          {currentTheme ? "Dark" : "Light"}
        </h1>
      </div>
    );
  }
}
