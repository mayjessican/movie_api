import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { MainView } from '../main-view/main-view';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  // BackButton = () => {
  //   return <MainView />
  // }

  // function User(props) {
  //   return <h1>Hello {props.match.params.username}!</h1>;
  // }
  
  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

      return (
      <div>
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
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
          <Link to={`movie/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`movie/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
          </Link>
        </div>
       </div>
       <div>
      <button onClick={ () =>onClick( null ) }>MainView</button>
       </div>
       </div>
     );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};