import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { MainView } from "../main-view/main-view";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import serverUrl from "../../helpers";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addToFavorites(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(`${serverUrl}/users/${user}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("Add Success");
        alert('This movie has been added to your Favorites.');
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  removeFromFavorites(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`${serverUrl}/users/${user}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("Remove Success");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div>
        <div className="movie-view">
          <img className="movie-poster" src={movie.ImageURL} />
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>

          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </div>
        </div>
        <div>
          <Link to={`/`}>
            <Button variant="link">Back</Button>
          </Link>
          <Button
            variant="link"
            onClick={() => this.addToFavorites(movie)}
            className="movie-card-fav"
          >
            Add favorite!
          </Button>
        </div>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
