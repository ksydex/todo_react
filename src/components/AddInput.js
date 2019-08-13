import React from "react";

export default class AddInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  inputChange = event => {
    this.setState({ input: event.target.value });
  };

  handleEnter = event => {
    if (event.key === "Enter") {
      this.addNote();
    }
  };

  addNote = () => {
    const task = this.state.input;
    console.log(task);

    this.props.addTask(task);
    this.setState({ input: "" });
  };

  render() {
    const { input } = this.state;

    return (
      <div className="add-task">
        <input
          className="ml-1"
          placeholder="Your task here"
          value={input}
          onChange={this.inputChange}
          onKeyPress={this.handleEnter}
        />
        <button className="bg-main" onClick={this.addNote}>
          Add
        </button>
      </div>
    );
  }
}
