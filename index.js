import React, {Component} from "react";
import {EventEmitter} from "events";
import _ from "underscore";

var state = {
  todos: [{id: 1, body: "learn clojure"}]
};

var ee = new EventEmitter();

var TodoActions = {
  create(payload) {
    state.todos.push(payload.todo);
    ee.emit("change");
  }
};

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {todo: {}};
    this._onChange = this._onChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  };
  componentDidMount() {
    ee.on("change", () => {
      this.setState({todo: {}});
    });
  };
  _onChange(e) {
    this.setState({todo: {id: _.uniqueId(), body: e.target.value}})
  };
  _handleSubmit(e) {
    e.preventDefault();
    TodoActions.create({todo: this.state.todo});
  };
  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input onChange={this._onChange} type="text" placeholder="Todo .." value={this.state.todo.body} />
        <input type="submit" />
      </form>
    );
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
  };
  todo(t) {
    return (
      <li key={t.id}>{t.body}</li>
    )
  };
  render() {
    return (
      <ul>
        {this.props.todos.map(this.todo)}
      </ul>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = state;
  };
  componentDidMount() {
    ee.on("change", () => {
      this.setState(state);
    });
  };
  render() {
    return (
      <div>
        <TodoForm />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

React.render(<App />, document.getElementById("root"));
