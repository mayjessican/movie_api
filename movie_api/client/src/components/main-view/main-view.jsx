import React from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";


import { setMovies, setUser } from "../../actions/actions";
import MoviesList from '../movies-list/movies-list';
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateProfile } from "../update-profile/update-profile";
import Button from "react-bootstrap/Button";
import serverUrl from "../../helpers";

//export class MainView extends React.Component {
export class MainView extends React.Component {
  constructor() {
    super();

    // Initial states are set here, if something is not here, it's also null/undefined
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut(authData) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getMovies(token) {
    axios
      .get(`${serverUrl}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  register(registering) {
    this.setState({ register: registering });
  }

  render() {
    const { register } = this.state;
    let { movies } = this.props;
    let { user } = this.state;

    if (register) {
      return (
        <RegistrationView
          onClick={() => this.alreadyMember()}
          onSignedIn={(user) => this.onSignedIn(user)}
          onRegister={(registering) => this.register(registering)}
        />
      );
    }

    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={(registering) => this.register(registering)}
        />
      );

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <div className="main-view">
          <Link to={`/user/${user}`}>
            <Button variant="link">View Profile</Button>
          </Link>
          <Navbar className="fixed-top" bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/user/${user}`}>
                Profile
              </Nav.Link>
              <Nav.Link onClick={() => this.onLoggedOut()}>LogOut</Nav.Link>
            </Nav>
          </Navbar>
          <br></br>
          <br></br>
          <Route
            exact
            path="/"
            render={() => {
              if (!user) {
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              }
              
              return <MoviesList movies={movies}/>;

            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
          <Route
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          />
          <Route
            exact
            path="/user/:userName"
            render={() => <ProfileView movies={movies} />}
          />
          <Route
            path="/users/:userName/update"
            render={() => <UpdateProfile />}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
   return { movies: state.movies }
 }

 export default connect(mapStateToProps, { setMovies, setUser } )(MainView);
