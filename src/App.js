import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movie, setMovie] = useState({});
  const PAGEMIN = 1;
  const PAGEMAX = 500;
  const INDEXMIN = 1;
  const INDEXMAX = 20;

  const getRandomPage = () => {
    return Math.floor(Math.random() * (PAGEMAX - PAGEMIN) + PAGEMIN);
  };

  const getRandomIndex = () => {
    return Math.floor(Math.random() * (INDEXMAX - INDEXMIN) + INDEXMIN);
  };

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular",
    params: {
      api_key: "2c5515ead5ef7d5bc8c51992862f2c77",
      language: "en-US",
      page: getRandomPage(),
    },
  };

  const getMovie = async () => {
    try {
      const { data } = await axios.request(options);
      const index = getRandomIndex();
      return data.results[index];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie().then((data) => setMovie(data));
  }, []);

  return (
    <>
      <h1>🐺 Movie recommendation for WOLFIES 🐺</h1>
      <img
        src={
          movie ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : ``
        }
      />
      <p>{movie ? movie.title : `Empty`}</p>
      <p>{movie ? movie.overview : `Empty`}</p>
    </>
  );
}

export default App;
