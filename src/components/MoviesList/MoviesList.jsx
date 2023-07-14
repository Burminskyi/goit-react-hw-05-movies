import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MoviesList = ({ movies, page }) => {
  const location = useLocation();

  if (page === 'homePage')
    return (
      <ul>
        {movies.map(movie => {
          if (!movie.original_title)
            return (
              <li key={movie.id}>
                <Link to={`movies/${movie.id}`} state={{ from: location }}>
                  No title
                </Link>
              </li>
            );
          return (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    );

  if (page === 'moviesPage')
    return (
      <ul>
        {movies.map(movie => {
          if (!movie.original_title)
            return (
              <li key={movie.id}>
                <Link to={`${movie.id}`} state={{ from: location }}>
                  No title
                </Link>
              </li>
            );
          return (
            <li key={movie.id}>
              <Link to={`${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  page: PropTypes.string.isRequired,
};
