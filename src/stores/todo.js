import EventEmitter from "events";
import AppDispatcher from "../dispatcher/appdispatcher";
import _ from "underscore";

var todos = [{id: 9, body: "learn clojure"}, {id: 10, body: "learn react"}, {id: 11, body: "learn typescript"}];
var perPage = 1;
var pagination = {
  totalPages: Math.round(todos.length/perPage),
  currentPage: 1
};

var TodoStore = _.extend({}, EventEmitter.prototype, {
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
