import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'services/getMovies';
import { Loader } from './Loader/Loader';

export const Cast = () => {
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const getCastInfo = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCredits(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCastInfo();
  }, [movieId]);

  if (isLoading) return <Loader />;

  return (
    <>
      <h2>Cast:</h2>
      {credits !== [] && (
        <ul>
          {credits.map(credit => (
            <li key={credit.id}>
              <img
                // className={styles.ImageGalleryItemImage}
                src={
                  credit.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${credit.profile_path}`
                    : 'https://cdn-icons-png.flaticon.com/256/20/20773.png'
                }
                alt={credit.name}
              />
              <p>{credit.name}</p>
              <p>Character: {credit.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
