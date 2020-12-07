import React, { Component } from "react";

class MoviesTableHeader extends Component {
  raiseSort = (path) => {
    const { onSort } = this.props;
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    const { raiseSort, renderSortIcon } = this;
    const { columns } = this.props;
    return (
      <thead className="thead-dark">
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default MoviesTableHeader;
