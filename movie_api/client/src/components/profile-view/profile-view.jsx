import React, { useState } from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
import serverUrl from "../../helpers";

//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      Movies: [],
    };
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios
      .get(`${serverUrl}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      }) //get user info first
      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      });
  }

  removeFromFavorites(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`${serverUrl}/users/${user}/movies/${movie}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // remove it from the current state
        const currentFavoriteMovies = this.state.FavoriteMovies;
        delete currentFavoriteMovies[currentFavoriteMovies.indexOf(movie)];
        this.setState({
          FavoriteMovies: currentFavoriteMovies,
        });
      })
      .catch(function (err) {
      });
  }

  deleteUser(e) {
    axios
      .delete(`${serverUrl}/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        alert("Account deleted");
        localStorage.removeItem("token", "user");
        window.open("/");
      })
      .catch((event) => {
        alert("failed to delete user");
      });
  }

  render() {
    const { movies } = this.props;
    const FavoriteMovieList = movies.filter((movie) =>
      this.state.FavoriteMovies.includes(movie._id)
    );

    return (
      <div>
        <Container>
          <h1>My Profile</h1>
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Password: xxx</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
              Favorite Movies:
              {FavoriteMovieList.map((movie) => (
                <div key={movie._id} className="fav-movies-button">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">{movie.Title}</Button>
                  </Link>
                  <br></br>
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={(e) => this.removeFromFavorites(movie._id)}
                  >
                    Remove Favorite
                  </Button>
                </div>
              ))}
              <br />
              <br />
              <Link to={"/users/:userName/update"}>
                <Button variant="primary">Update Profile</Button>
                <br />
                <br />
                <Button variant="dark" onClick={() => this.deleteUser()}>
                  Delete User
                </Button>
              </Link>
              <br />
              <br />
              <Link to={`/`}>Back</Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
