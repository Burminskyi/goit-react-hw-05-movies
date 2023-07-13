import { MoviesList } from 'components/MoviesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByName } from 'services/getMovies';

export const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState('');
  const [error, setError] = useState('');
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
        setError(error.message);
      }
    };
    fetchMoviesByQuery();

    // getMoviesByName(query).then(data => {
    //   console.log(data.results);
    //   setMovies(data.results);
    // });
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

// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import styles from './Searchbar.module.css';

// export const Searchbar = ({ onSubmit }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearchQuery = e => {
//     setSearchQuery(e.target.value.toLowerCase().trim());
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     if (searchQuery.trim() === '') {
//       alert('Введите запрос');
//       return;
//     }

//     onSubmit(searchQuery);
//   };

//   return (
//     <header className={styles.Searchbar}>
//       <form onSubmit={handleSubmit} className={styles.SearchForm}>
//         <button type="submit" className={styles.SearchFormButton}>
//           <span className={styles.SearchFormButtonLabel}>Search</span>
//         </button>

//         <input
//           className={styles.SearchFormInput}
//           type="text"
//           autoComplete="off"
//           value={searchQuery}
//           onChange={handleSearchQuery}
//           autoFocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   );
// };

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
