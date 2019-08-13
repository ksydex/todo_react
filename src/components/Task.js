import React from "react";
import { AddInput } from "./index";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editInput: props.task.task,
      showSubtasks: false
    };
  }

  addSubTask = subTask => {
    const id = this.props.task.id;
    this.props.addSubTask(id, subTask);
  };

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

  toggleSubtasks = () => {
    this.setState({ showSubtasks: !this.state.showSubtasks });
  };

  render() {
    const { task, done } = this.props;
    const { editing, editInput, showSubtasks } = this.state;

    let className = "task-list--task";
    if (done) className += " task-list--task-done";

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
      <li className={showSubtasks ? "bg-white-half" : ""} key={task.id}>
        <div className={className}>
          {editing ? (
            <input
              className="ml-1"
              value={editInput}
              onChange={this.editInputChange}
            />
          ) : (
            <span>
              <span onClick={this.props.doneTask}>{task.task}</span>
              <span className="ml-2" onClick={this.toggleSubtasks}>
                {showSubtasks ? "▲" : "▼"}
              </span>
            </span>
          )}
          <div>
            {!done && !editing && (
              <span
                role="img"
                aria-label="Done"
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
              style={{
                cursor: "pointer",
                marginLeft: 10
              }}
              role="img"
              aria-label="X"
            >
              ✖️
            </span>
            {editBtn}
          </div>
        </div>
        {showSubtasks ? (
          <div className="ml-2">
            {task.subTasks ? (
              <ul className="task-list">
                {this.props.task.subTasks.map(item => {
                  return (
                    <li className="task-list--task" key={item.id}>
                      {item.task}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
            <AddInput
              placeholder="Your subtask here"
              addTask={this.addSubTask}
            />
          </div>
        ) : (
          ""
        )}
      </li>
    );
  }
}
