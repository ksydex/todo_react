import React from "react";

export default class ChangeTheme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTheme: true
    };
  }

  changeTheme = () => {
    this.setState({ currentTheme: !this.state.currentTheme });
    const dark = {
      main: "#29ad99",
      accent: "#ef7a85",
      text: "#ffffff",
      bg: "#131515"
    };
    const light = {
      main: "#29ad99",
      accent: "#ef7a85",
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
