import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import "./movies-list.scss";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  console.log('visibility', visibilityFilter);
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    console.log('filter movies', filteredMovies);
  }

  if (!movies) return <div className="main-view"/>;
   return (
    <div>
      <div className="filter-wrapper">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </div>
      <div className="movies-list">
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);