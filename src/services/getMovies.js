const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=d30846261444a5a49dd702fa51e06838';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzA4NDYyNjE0NDRhNWE0OWRkNzAyZmE1MWUwNjgzOCIsInN1YiI6IjY0N2EwNmVhMGUyOWEyMDExNmFjMjc4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tsNk25POiqhHGD8XWZG5zrh-GEA1QO3lFkkZCPF82kY',
  },
};

export const getTrendingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}trending/all/day?language=en-US&${API_KEY}`
  );
  const data = await res.json();
  return data;
};

export const getMoviesById = async id => {
  const res = await fetch(`${BASE_URL}movie/${id}language=en-US&`, options);
  const data = await res.json();
  return data;
};

export const getMoviesByName = async query => {
  const res = await fetch(
    `${BASE_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  const data = await res.json();
  return data;
};

export const getMovieCredits = async id => {
  const res = await fetch(
    `${BASE_URL}movie/${id}/credits?language=en-US`,
    options
  );
  const data = await res.json();
  return data;
};

export const getMovieReviews = async id => {
  const res = await fetch(
    `${BASE_URL}movie/${id}/reviews?language=en-US&page=1`,
    options
  );
  const data = await res.json();
  return data;
};
