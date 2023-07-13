import { Link, useLocation } from 'react-router-dom';

export const MoviesList = ({ movies, page }) => {
  const location = useLocation();

  if (page === 'homePage')
    return (
      <ul>
        {movies.map(movie => {
          if (!movie.original_title) return;
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
          if (!movie.original_title) return;
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
