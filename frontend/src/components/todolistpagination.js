import React, {Component} from "react";
import TodoActions from "../actions/todo";

class PageListItem extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  };
  _onClick() {
    TodoActions.clickPage({page: this.props.page});
  };
  render() {
    var classString = "";
    if(this.props.page == this.props.pagination.currentPage) {
      classString = "active";
    }
    return (
      <span onClick={this._onClick}>
        <span className={classString}> {this.props.page}</span> |
      </span>
    );
  }
}

class PageList extends Component {
  constructor(props) {
    super(props);
  };
  page(p) {
    return (
      <PageListItem key={p} page={p} pagination={this.props.pagination} />
    );
  };
  render() {
    var pages = [];
    for (var i = 1; i <= this.props.pagination.totalPages; i++) {
      pages.push(this.page(i));
    }
    return (
      <div>{pages}</div>
    );
  }
}

module.exports = PageList;
