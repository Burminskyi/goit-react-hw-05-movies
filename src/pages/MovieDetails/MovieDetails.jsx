import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { getMoviesById } from 'services/getMovies';

const MovieDetails = () => {
  const [filmInfo, setFilmInfo] = useState([]);
  const { movieId } = useParams();
  
  const location = useLocation();

  const backLinkHref = useRef(location.state?.from ?? '/');
  const { poster_path, vote_average, overview, genres, title } = filmInfo;

  const userScore = (vote_average * 10).toFixed() + '%';
  console.log(userScore);

  useEffect(() => {
    getMoviesById(movieId).then(data => {
      setFilmInfo(data);
    });
  }, [movieId]);

  return (
    <>
      <button type="button" className={styles.detailsBtn}>
        <Link to={backLinkHref.current}>Go back</Link>
      </button>
      <div className={styles.detailsWrap}>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt={title}
          />
        )}
        <div>
          <h1>{title}</h1>
          <p>User score: {userScore !== '0%' ? userScore : 'Not scored yet'}</p>
          <b>Overview</b>
          <p>{overview}</p>
          <b>Genres</b>
          <div>
            {genres && genres.map(genre => <p key={genre.id}>{genre.name}</p>)}
          </div>
        </div>
      </div>
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetails;
