import React, { useEffect, useState } from "react";
import Panel from "./Panel/Panel";
import MovieTile from "./components/MovieTile/MovieTile";
import "./MoviesList.scss";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const LIMIT = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/movies?limit=" + LIMIT,
        );

        if (response.ok) {
          const data = await response.json();
          //   console.log(data);
          setMovies(data.data);
          setTotalAmount(data.totalAmount);
        } else {
          console.log("Error");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="movies">
      <div className="container">
        <Panel />

        <div className="movies__totalAmount">
          <span>{totalAmount}</span> movies found
        </div>
        <div className="movies__wrapper">
          {movies.map((movie) => (
            <MovieTile movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesList;
