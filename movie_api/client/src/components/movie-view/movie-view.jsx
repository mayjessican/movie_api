import React from 'react';
import ReactDOM from "react-dom";
import { MainView } from '../main-view/main-view';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  // BackButton = () => {
  //   return <MainView />
  // }

  // BackButton = () => {
  //   Router.push("./main-view")
  // }

  // function User(props) {
  //   return <h1>Hello {props.match.params.username}!</h1>;
  // }
  
  // ReactDOM.render(
  //   <Router>
  //     <Route path="main-view/" component={User} />
  //   </Router>,
  //   node
  // );

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    // ReactDOM.render(
    //   <Router>
    //     <div>
    //       <Route exact path="/">
    //         <MainView />
    //       </Route>
    //       <Route path="/main-view">
    //         <MainView />
    //       </Route>
    //     </div>
    //   </Router>
    // );

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
         <Link to={"/"}>
         <button onclick={() => this.BackButton()}>Back</button>
         </Link>
      {/* <button onClick={ this.BackButton }>MainView</button> */}
       </div>
       </div>
     );
  }
}