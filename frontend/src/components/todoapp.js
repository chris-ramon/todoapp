import React, {Component} from "react";
import TodoForm from "./todoform";
import TodoList from "./todolist";
import TodoStore from "../stores/todo";
import TodoActions from "../actions/todo";

var getStateFromStores = () => {
  return {
    todos: TodoStore.getCurrentTodos(),
    pagination: TodoStore.getCurrentPagination()
  }
};

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  };
  componentDidMount() {
    TodoActions.appStarted();
    TodoStore.on("change", this._onChange);
  };
  _onChange() {
    this.setState(getStateFromStores());
  };
  render() {
    return (
      <div>
        <TodoForm />
        <TodoList todos={this.state.todos} pagination={this.state.pagination} />
      </div>
    );
  };
}

module.exports = TodoApp;
