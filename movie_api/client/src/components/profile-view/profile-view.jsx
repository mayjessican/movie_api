import React, { useState} from 'react';
//Routing
import axios from 'axios';
import { Link } from 'react-router-dom';

//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

// export function ProfileView(props) {
//   const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [birthday, setDob] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios.post('https://helloworld-test-1234.herokuapp.com/users', {
//       Username: username,
//       Password: password,
//       Email: email,
//       Birthday: birthday
//     })
//     .then(response => {
//       const data = response.data;
//       console.log(data);
//       window.open('/', '_self');
//     })
//     .catch(e => {
//       console.log('error registering the user')
//     });
//   }}

//   return (
//     <Container style={{ width: "42rem" }}>
//       <Form>
//         <Form.Group controlId="formBasicUsername">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Form.Text className="text-muted">
//             We will never share your information with anyone
//           </Form.Text>
//         </Form.Group>
//         <Form.Group controlId="formBasicDob">
//           <Form.Label>Birthday</Form.Label>
//           <Form.Control
//             type="date"
//             placeholder="12/31/1999"
//             value={birthday}
//             onChange={(e) => setDob(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formBasicCheckbox">
//           <Form.Check
//             type="checkbox"
//             label="Confirm you want to update your profile."
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit" onClick={handleSubmit}>
//           Update
//         </Button>{" "}
//       </Form>
//     </Container>
//   );  
  
//start here  
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    console.log(username)

    axios
      .get(`https://helloworld-test-1234.herokuapp.com/users/${userName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movies } = this.props;
    const favoriteMovieList = movies.filter((movie) =>
      this.state.favoriteMovies.includes(movie._id)
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
              {favoriteMovieList.map((movie) => (
                <div key={movie.movie_id} className="fav-movies-button">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">{movie.Title}</Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={(e) => this.deleteFavoriteMovie(movie._id)}
                  >
                    Remove Favorite
                  </Button>
                </div>
              ))}
              <br />
              <br />
              <Link to={'/user/update'}>
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