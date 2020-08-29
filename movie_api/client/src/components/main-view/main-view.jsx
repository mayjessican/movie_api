import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {
    constructor() {
      super();
  
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    }
  
// One of the "hooks" available in a React Component
    // onLoggedIn(user) {
    //   this.setState({
    //     user
    //   });
    // }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }

    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
    
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    getMovies(token) {
      axios.get('https://helloworld-test-1234.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    register() {
      this.setState({register: true});
    }
  
    render() {
      const { movies, selectedMovie, user, register } = this.state;

      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  
      // Before the movies have been loaded
      // if (!movies) return <div className="main-view"/>;
      // return (
      //  <div className="main-view">
      //   {selectedMovie ? <MovieView movie={selectedMovie} onClick={ movie => this.onMovieClick(movie) }/>
      //      : movies.map(movie => (
      //        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
      //        //<MovieView key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
      //      ))
      //   }
      //  </div>
      // );

     if (!movies) return <div className="main-view"/>;

     if(register) return <RegistrationView
             onClick={() => this.alreadyMember()}
             onSignedIn={(user) => this.onSignedIn(user)}
           />;

    return (
    <Router>
    <div className="main-view">
    <Route exact path="/" render={() => {
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      return movies.map(m => <MovieCard key={m._id} movie={m}/>)}
      }/>
    {/* <Route exact path="/" render={() => { <RegistrationView />} />
    } */}
    <Route path="/register" render={() => <RegistrationView />} />
    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
    <Route path="/directors/:name" render={({ match }) => {
      //if (!movies) return <div className="main-view"/>;
      return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
    } />
    <Route exact path="/genres/:name" render={({ match }) => {
      if (!movies) return <div className="main-view"/>;
      return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
      } 
    }/>
    </div>
    </Router>
    );
  }
}