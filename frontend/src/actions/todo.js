import AppDispatcher from "../dispatcher/appdispatcher";
import _ from "underscore";

var TodoActions = {
  appStarted: () => {
    AppDispatcher.dispatch({actionType: "todo-app-started"});
  },
  create: (payload) => {
    AppDispatcher.dispatch(_.extend(payload, {actionType: "todo-create"}));
  },
  remove: (payload) => {
    AppDispatcher.dispatch(_.extend(payload, {actionType: "todo-remove"}));
  },
  clickPage: (payload) => {
    AppDispatcher.dispatch(_.extend(payload, {actionType: "todo-page-change"}));
  }
};

module.exports = TodoActions;
