import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../common/like"; //Common / Reusable Components
import Table from "../common/table";
import auth from "../../services/authServices";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          likeOnClick={() => this.props.onLike(movie)}
        />
      ),
    },
  ];
  deleteColumn = {
    key: "action",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { columns } = this;
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={columns}
        movies={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
