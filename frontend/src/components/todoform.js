import React, {Component} from "react";
import TodoStore from "../stores/todo";
import TodoActions from "../actions/todo";
import _ from "underscore";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {todo: {}};
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onTodoChange = this._onTodoChange.bind(this);
  };
  componentDidMount() {
    TodoStore.on("change", this._onChange);
  };
  _onChange() {
    this.setState(this._getInitialState());
  };
  _getInitialState() {
    return {todo: {}};
  };
  _onSubmit(e) {
    e.preventDefault();
    if(_.isEmpty(this.state.todo)) return;
    TodoActions.create({todo: this.state.todo});
  };
  _onTodoChange(e) {
    this.setState({todo: {body: e.target.value}});
  };
  render() {
    return(
      <form onSubmit={this._onSubmit}>
        <input onChange={this._onTodoChange} type="text" value={this.state.todo.body} autoFocus />
        <input type="submit" />
      </form>
    );
  };
}

module.exports = TodoForm;
