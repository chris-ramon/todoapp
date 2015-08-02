import EventEmitter from "events";
import AppDispatcher from "../dispatcher/appdispatcher";
import _ from "underscore";

var todos = [];
var perPage = 1;
var pagination = {
  totalPages: Math.round(todos.length/perPage),
  currentPage: 1
};
var API = "http://localhost:8081/";

var TodoStore = _.extend({}, EventEmitter.prototype, {
  init: function() {
    if(todos.length === 0) {
      fetch(API+"todos").then(_.bind(this._onGetTodos, this));
    }
  },
  _onGetTodos: function(response) {
    response.json().then(_.bind(data => {
      todos = data;
      this.emitChange();
    }, this));
  },
  getCurrentTodos: () => {
    var begin = perPage * (pagination.currentPage - 1),
      end = (perPage * pagination.currentPage) + perPage;
    return todos.slice(begin, end - 1);
  },
  getCurrentPagination: function() {
    return _.extend(pagination, {totalPages: Math.round(todos.length/perPage)});
  },
  emitChange: function() {
    this.emit("change");
  },
  create: (payload) => {
    todos.push(_.extend(payload.todo, {id: _.uniqueId()}));
  },
  remove: (payload) => {
    todos = _.without(todos, payload.todo);
  },
  pageChange: (payload) => {
    pagination.currentPage = payload.page;
  },
});

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case "todo-app-started":
      TodoStore.init();
      break;
    case "todo-create":
      TodoStore.create(payload);
      TodoStore.emitChange();
      break;
    case "todo-remove":
      TodoStore.remove(payload);
      TodoStore.emitChange();
      break;
    case "todo-page-change":
      TodoStore.pageChange(payload);
      TodoStore.emitChange();
      break;
  }
});

module.exports = TodoStore;
