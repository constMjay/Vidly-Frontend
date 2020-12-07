import React from "react";
import MoviesTableHeader from "./moviesTableHeader";
import MoviesTableBody from "./moviesTableBody";

const Table = ({ columns, movies, onSort, sortColumn }) => {
  return (
    <div className="table-responsive-lg table-responsive-md table-responsive-sm">
      <table className="table table-striped table-hover mt-3 text-center">
        <MoviesTableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <MoviesTableBody data={movies} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
