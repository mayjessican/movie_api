import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MainView } from '/components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// import { Title, List } from './components/App';
// import './index.css';
// ReactDOM.render(
//   <Router>
//       <div>
//         <Route exact path="/" component={Title} />
//         <Route path="/list" component={List} />
//       </div>
//   </Router>,
//   document.getElementById('app')
// )

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <MainView/>
        </div>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);