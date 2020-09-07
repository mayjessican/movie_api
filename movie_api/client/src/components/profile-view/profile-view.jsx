import React, { useState} from 'react';
//Routing
import axios from 'axios';
import { Link } from 'react-router-dom';

//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
 
//start here  
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavouriteMovies: [],
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
    console.log('username', username);
    console.log('token', token);

    axios
      .get(`https://helloworld-test-1234.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('res', res); 
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavouriteMovies: res.data.FavouriteMovies, 
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movies } = this.props;
    console.log("ProfileView", this.state)
    // if (this.state.FavouriteMovies) {
    //     FavouriteMovieList = movies.filter((movie) =>
    //       this.state.FavouriteMovies.includes(movie._id)
    //     );
    // }
    
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
              Favourite Movies:
              {/* {FavouriteMovieList.map((movie) => (
                <div key={movie.movie_id} className="fav-movies-button">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">{movie.Title}</Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={(e) => this.deleteFavouriteMovie(movie._id)}
                  >
                    Remove Favourite
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => this.addFavouriteMovie(movie._id)}
                  >
                    Add Favourite
                  </Button>
                </div>
              ))} */}
              <br />
              <br />
              <Link to={'/users/:userName/update'}>
                <Button variant="primary">Update Profile</Button>
                <br />
                <br />
              </Link>
              <Button onClick={() => this.deleteUser()}>Delete User</Button>
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