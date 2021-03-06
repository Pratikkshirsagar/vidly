import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  handleChange = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies: movies,
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies } = this.state;
    if (count === 0) return <p>There are no movies to show</p>;

    const moviesList = paginate(movies, currentPage, pageSize);

    return (
      <React.Fragment>
        <p>Showing {count} moviesin the db</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {moviesList.map((table) => {
              return (
                <tr key={table._id}>
                  <td>{table.title}</td>
                  <td>{table.genre.name}</td>
                  <td>{table.numberInStock}</td>
                  <td>{table.dailyRentalRate}</td>
                  <td>
                    <Like onClick={() => this.handleLike(table)} liked={table.liked} />
                  </td>
                  <td>
                    <button
                      onClick={(event) => this.handleChange(table)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
