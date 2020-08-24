import React from 'react';
import ReactDOM from "react-dom";
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
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
       </div>
       <div>
      <button onClick={ () =>onClick( null ) }>MainView</button>
       </div>
       </div>
     );
  }
}