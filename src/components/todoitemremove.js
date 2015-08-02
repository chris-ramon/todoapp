import React, {Component} from "react";
import TodoActions from "../actions/todo";

class TodoItemRemove extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  };
  _onClick(e) {
    e.preventDefault();
    TodoActions.remove({todo: this.props.todo});
  };
  render() {
    return (
      <a onClick={this._onClick} href="#">
        Remove
      </a>
    );
  }
}

module.exports = TodoItemRemove;
