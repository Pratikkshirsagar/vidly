import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleChange = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies: movies,
    });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies to show</p>;
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
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((table) => {
              return (
                <tr key={table._id}>
                  <td>{table.title}</td>
                  <td>{table.genre.name}</td>
                  <td>{table.numberInStock}</td>
                  <td>{table.dailyRentalRate}</td>
                  <td>
                    <button onClick={(event) => this.handleChange(table)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
