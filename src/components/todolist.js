import React, {Component} from "react";
import TodoItemRemove from "./todoitemremove";
import PageList from "./todolistpagination";

class TodoList extends Component {
  todoItem(t) {
    return (
      <li key={t.id}>
        {t.body} - <TodoItemRemove todo={t} />
      </li>
    )
  };
  render() {
    return (
      <div>
        <ul>
        {this.props.todos.map(this.todoItem)}
        </ul>
        <PageList pagination={this.props.pagination} />
      </div>
    );
  }
}

module.exports = TodoList;
