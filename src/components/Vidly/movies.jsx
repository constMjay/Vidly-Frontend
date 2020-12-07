import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getGenres } from "../../services/genreServices";
import { deleteMovie, getMovies } from "../../services/movieServices"; //Fake DB
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import SearchBox from "./../common/searchBox";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    const { movies } = this.state;
    let moviesInDatabase = movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: moviesInDatabase });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This movie has already been deleted!");

        this.setState({ movies });
      }
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };
  showNotifMessage = () => {
    const { movies } = this.state;
    return movies.length;
  };
  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { user } = this.props;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const {
      handleDelete,
      handleLike,
      handlePageChange,
      handleGenreSelect,
      handleSort,
      handleSearch,
      getPageData,
    } = this;
    const { totalCount, data: movies } = getPageData();

    return (
      <div className="container">
        <div className="table-content">
          <div className="row">
            <div className="col-lg-3 col-md-3 mt-5">
              <ListGroup
                items={genres}
                selectedItem={selectedGenre}
                onItemSelect={handleGenreSelect}
              />
            </div>
            <div className="col">
              <div>
                {user && (
                  <Link to="/movies/add-movie" className="btn btn-primary mt-3">
                    New Movie
                  </Link>
                )}
                <h3 className="mt-3">
                  The're {totalCount} showing movies from database!
                </h3>
                {/* Here is the Search Box */}
                <SearchBox value={searchQuery} onChange={handleSearch} />
                {/* Here is the Table */}
                <MoviesTable
                  movies={movies}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  sortColumn={sortColumn}
                  onSort={handleSort}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Movies;
