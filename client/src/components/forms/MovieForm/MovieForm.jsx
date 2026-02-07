import React, { useEffect } from "react";
import "./MovieForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";

const MovieForm = ({ setHideHeader, setHideProfile, mode }) => {
  useEffect(() => {
    setHideHeader(true);
    setHideProfile(true);
    document.body.classList.add("change-color");
  }, []);

  return (
    <section className="movie_form">
      <div className="container">
        <div className="form">
          <FontAwesomeIcon icon={faXmark} />
          <h2>{mode === "add" ? "add movie" : "edit movie"}</h2>
          <form>
            <label className="title" htmlFor="title">
              TITLE
              <input id="title" type="text" placeholder="Movie title" />
            </label>
            <label className="date" htmlFor="date">
              RELEASE DATE
              <input
                id="date"
                type="text"
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
                placeholder="Select Date"
              />
            </label>
            <label className="poster" htmlFor="poster">
              POSTER URL
              <input id="poster" type="text" placeholder="https://" />
            </label>
            <label className="rating" htmlFor="rating">
              RATING
              <input id="rating" type="text" placeholder="7.8" />
            </label>
            <label className="genre" htmlFor="genre">
              GENRE
              <select id="genre">
                <option defaultChecked>Select Genre</option>
              </select>
            </label>
            <label className="duration" htmlFor="duration">
              RUNTIME
              <input id="duration" type="text" placeholder="minutes" />
            </label>
            <label className="description" htmlFor="description">
              OVERVIEW
              <textarea id="description" placeholder="Movie description" />
            </label>
            <div className="buttons">
              <button type="button" className="buttons__reset">
                reset
              </button>
              <button type="button" className="buttons__submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MovieForm;
