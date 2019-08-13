import React from "react";

import { Task, ChangeTheme } from "../components";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    this.state = {
      notes: notes,
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
    if (this.state.input !== "") {
      this.setState(
        state => {
          let notes = state.notes;
          notes.push({
            id: notes.length !== 0 ? notes[notes.length - 1].id + 1 : 1,
            task: state.input
          });
          return { notes, input: "" };
        },
        () => this.updateLocalStorage()
      );
    }
  };

  saveEditedTask = (id, task) => {
    const index = this.state.notes.map(item => item.id).indexOf(id);
    this.setState(
      state => {
        let notes = state.notes;
        notes[index].task = task;
        return notes;
      },
      () => this.updateLocalStorage()
    );
  };

  doneTask = id => {
    const index = this.state.notes.map(item => item.id).indexOf(id);
    this.setState(
      state => {
        let notes = state.notes;
        notes[index].status = true;
        return notes;
      },
      () => this.updateLocalStorage()
    );
  };

  removeNote = id => {
    this.setState(
      { notes: this.state.notes.filter(item => item.id !== id) },
      () => this.updateLocalStorage()
    );
  };

  updateLocalStorage = () => {
    const json = JSON.stringify(this.state.notes);
    localStorage.setItem("notes", json);
  };

  render() {
    const { notes, input } = this.state;
    const activeNotes = notes.filter(item => !item.status);
    const doneNotes = notes.filter(item => item.status);

    return (
      <div className="main-view">
        <div className="top-bar">
          <h1 className="header color-main">Your tasks: {notes.length}</h1>
          <ChangeTheme />
        </div>

        <div>
          <ul className="task-list p">
            {notes.length ? (
              [...activeNotes, ...doneNotes].map(item => {
                return (
                  <Task
                    done={item.status}
                    key={item.id}
                    task={item}
                    remove={() => this.removeNote(item.id)}
                    doneTask={() => this.doneTask(item.id)}
                    editTask={this.saveEditedTask}
                  />
                );
              })
            ) : (
              <p className="p color-accent">No tasks!</p>
            )}
          </ul>
          <div className="add-task">
            <input
              placeholder="Your task here"
              value={input}
              onChange={this.inputChange}
              onKeyPress={this.handleEnter}
            />
            <button className="bg-main" onClick={this.addNote}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
