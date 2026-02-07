import React, { useEffect } from "react";
import "./MovieForm.scss";

const MovieForm = ({ setHideHeader, setHideProfile }) => {
  useEffect(() => {
    setHideHeader(true);
    setHideProfile(true);
  }, []);

  return (
    <section className="add_movie">
      <div className="container">
        <form>
          <h2>add movie</h2>
          <label htmlFor="title">
            TITLE
            <input id="title" type="text" placeholder="Movie title" />
          </label>
          <label htmlFor="date">
            RELEASE DATE
            <input id="date" type="date" placeholder="Select Date" />
          </label>
          <label htmlFor="poster">
            POSTER URL
            <input id="poster" type="text" placeholder="https://" />
          </label>
          <label htmlFor="rating">
            RATING
            <input id="rating" type="text" placeholder="7.8" />
          </label>
          <label htmlFor="genre">
            GENRE
            <select name="" id="genre">
              <option defaultChecked>Select Genre</option>
            </select>
          </label>
          <label htmlFor="duration">
            RUNTIME
            <input id="duration" type="text" placeholder="minutes" />
          </label>
          <label htmlFor="description">
            OVERVIEW
            <textarea id="description" placeholder="Movie description" />
          </label>
        </form>
      </div>
    </section>
  );
};

export default MovieForm;
