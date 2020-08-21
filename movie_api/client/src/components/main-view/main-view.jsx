import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
      super();
  
      this.state = {
        movies: null,
        selectedMovie: null
      };
    }
  
// One of the "hooks" available in a React Component
componentDidMount() {
  axios
    .get('http://localhost:8080/movies')
    //.get("https://helloworld-test-1234.herokuapp.com/movies")
    .then((response) => {
      // Assign the result to the state
      console.log(response)
      this.setState({
        movies: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
  
    onMovieClick(movie) {
      this.setState({
        selectedMovie: movie
      });
    }
    
    render() {
      const { movies, selectedMovie } = this.state;
  
      // Before the movies have been loaded
      if (!movies) return <div className="main-view"/>;
  
      return (
       <div className="main-view">
        {selectedMovie ? <MovieView movie={selectedMovie}/>
           : movies.map(movie => (
             <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
           ))
        }
       </div>
      );
    }
  }

// class MainView extends React.Component {
//     constructor() {
//       // Call the superclass constructor
//       // so React can initialize it
//       super();
  
//       // Initialize the state to an empty object so we can destructure it later
//       this.state = {};
//     }
  
//     // This overrides the render() method of the superclass
//     // No need to call super() though, as it does nothing by default
//     render() {
//       return (
//        <div className="main-view"></div>
//       );
//     }
//   }