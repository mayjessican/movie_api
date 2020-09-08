import React, { useState} from 'react';
//Routing
import axios from 'axios';
import { Link } from 'react-router-dom';

//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
 
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
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    const user = localStorage.getItem('user');
    console.log('username', username);
    console.log('token', token);

    axios
      .get(`https://helloworld-test-1234.herokuapp.com/users/${username}`, {
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
      })
  }

  deleteFavoriteMovie(movieId) {
    console.log(this.props.movies);
    axios
      .delete(
        `https://helloworld-test-1234.herokuapp.com/users/${localStorage.getItem(
          'user'
        )}/Movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then((res) => {
        alert('Removed movie from favorites');
      })
      .catch((e) => {
        alert('error removing movie' + e);
      });
  }

  deleteUser(e) {
    axios
      .delete(
        `https://helloworld-test-1234.herokuapp.com/users/${localStorage.getItem('user')}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then((response) => {
        alert('Account deleted');
        localStorage.removeItem('token', 'user');
        window.open('/');
      })
      .catch((event) => {
        alert('failed to delete user');
      });
  }

  render() {
    const { movies } = this.props;
    const FavoriteMovieList = movies.filter((movie) =>
      this.state.FavoriteMovies.includes(movie._id)
    );
    console.log("ProfileView", this.state)
    
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
                <div key={movie._id} className='fav-movies-button'>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant='link'>{movie.Title}</Button>
                  </Link>
                  <Button
                    variant='dark'
                    onClick={(e) => this.deleteFavoriteMovies(movie._id)} >
                    Remove Favorite
                  </Button>
                </div>
              ))}
              <br />
              <br />
              <Link to={'/users/:userName/update'}>
                <Button variant="primary">Update Profile</Button>
                <br />
                <br />
                <Button variant='dark' onClick={() => this.deleteUser()}>
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