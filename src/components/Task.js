import React from "react";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editInput: props.task.task
    };
  }

  editInputChange = event => {
    this.setState({ editInput: event.target.value });
  };

  editNote = () => {
    this.setState({ editing: true });
  };

  saveNote = () => {
    this.props.editTask(this.props.task.id, this.state.editInput);
    this.setState({ editing: false });
  };

  render() {
    const { task, done } = this.props;
    const { editing, editInput } = this.state;

    let className = "task-list--task";
    if (done) className += " task-list--task-done";
    const doneStyle = { color: "grey", textDecoration: "line-through" };

    const editBtn = editing ? (
      <span
        style={{ cursor: "pointer", marginLeft: 10 }}
        className="color-main"
        onClick={this.saveNote}
      >
        SAVE
      </span>
    ) : !done ? (
      <span
        onClick={this.editNote}
        style={{ color: "gray", cursor: "pointer", marginLeft: 10 }}
      >
        EDIT
      </span>
    ) : (
      ""
    );

    return (
      <li className={className} key={task.id} style={done ? doneStyle : {}}>
        {editing ? (
          <input value={editInput} onChange={this.editInputChange} />
        ) : (
          <span onClick={this.props.doneTask}>{task.task}</span>
        )}
        <div>
          {!done && !editing && (
            <span
              onClick={this.props.doneTask}
              className="color-main"
              style={{ cursor: "pointer", marginLeft: 10 }}
            >
              ✔
            </span>
          )}

          <span
            onClick={this.props.remove}
            className="color-accent"
            style={{ cursor: "pointer", marginLeft: 10 }}
          >
            X
          </span>
          {editBtn}
        </div>
      </li>
    );
  }
}
