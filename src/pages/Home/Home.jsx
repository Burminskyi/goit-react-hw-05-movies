import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/getMovies';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const page = 'homePage';

  useEffect(() => {
    const updateComponent = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    updateComponent();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies && <MoviesList movies={movies} page={page} />}
    </>
  );
};

export default Home;
