import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/getMovies';
import { Loader } from './Loader/Loader';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const getCastInfo = async () => {
      try {
        const data = await getMovieReviews(movieId);
        console.log(data);
        setReviews(data.results);
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
      <h2>Reviews:</h2>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <b>No rewievs</b>
      )}
    </>
  );
};
