import { MoviesList } from 'components/MoviesList';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from 'services/getMovies';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const page = 'homePage';

  useEffect(() => {
    const updateComponent = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    updateComponent();

    // getTrendingMovies().then(data => {
    //   console.log(data.results);
    //   setMovies(data.results);
    // });
  }, []);

  return (
    <>
      <h1>Trending today</h1>
          {movies && <MoviesList movies={movies} page={page} />}
    </>
  );
};
