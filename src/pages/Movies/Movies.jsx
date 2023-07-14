import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByName } from 'services/getMovies';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const page = 'moviesPage';

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) return;

    const fetchMoviesByQuery = async () => {
      try {
        const data = await getMoviesByName(query);
        setMovies(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMoviesByQuery();
  }, [searchParams]);

  const handleSearchQuery = e => {
    setSearchQuery(e.target.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      alert('Введите запрос');
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <button type="submit" className="">
          <span className="">Search</span>
        </button>

        <input
          className=""
          type="text"
          autoComplete="off"
          //   value={this.state.searchQuery}
          onChange={handleSearchQuery}
          autoFocus
          placeholder="Search movie"
        />
      </form>
      {movies && <MoviesList movies={movies} page={page} />}
    </>
  );
};

export default Movies;
