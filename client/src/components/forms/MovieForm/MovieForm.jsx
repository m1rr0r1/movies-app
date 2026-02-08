import React, { useEffect, useState } from "react";
import "./MovieForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const MovieForm = ({
  setHideHeader,
  setHideProfile,
  mode,
  setMovies,
  setAddMovie,
  setActiveModal,
  setRefetch,
}) => {
  useEffect(() => {
    setHideHeader(true);
    setHideProfile(true);
    document.body.classList.add("change-color");
  }, []);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { id, value } = e.target;

    if (id === "title") setTitle(value);
    else if (id === "date") setDate(value);
    else if (id === "poster") setPoster(value);
    else if (id === "rating") setRating(value);
    else if (id === "genre") setGenre(value);
    else if (id === "duration") setDuration(value);
    else if (id === "description") setDescription(value);
    setAttemptedSubmit(false);
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;

    if (id === "title") setTitle(value.trim());
    else if (id === "date") setDate(value.trim());
    else if (id === "poster") setPoster(value.trim());
    else if (id === "rating") setRating(value.trim());
    else if (id === "genre") setGenre(value.trim());
    else if (id === "duration") setDuration(value.trim());
    else if (id === "description") setDescription(value.trim());
  };

  const reset = () => {
    setTitle("");
    setDate("");
    setPoster("");
    setRating("");
    setGenre("");
    setDuration("");
    setDescription("");
    setAttemptedSubmit(false);
  };

  const closeForm = () => {
    navigate("/movies");
    setHideHeader(false);
    setHideProfile(false);
    document.body.classList.remove("change-color");
  };

  const handleSubmit = async () => {
    setAttemptedSubmit(true);

    if (mode === "add") {
      if (
        title &&
        date &&
        poster &&
        rating &&
        genre &&
        duration &&
        description
      ) {
        try {
          const response = await fetch("http://localhost:4000/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              release_date: date,
              poster_path: poster,
              vote_average: parseFloat(rating),
              genres: [genre],
              runtime: parseFloat(duration),
              overview: description,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data);

            setMovies((movies) => [...movies, data.data]);
            setRefetch(true);
            setAddMovie(true);
            setActiveModal(true);
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
            document.body.classList.remove("change-color");
            setHideHeader(false);
            setHideProfile(false);
            navigate("/movies");
          } else {
            console.log(data.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
    }
  };

  return (
    <section className="movie_form">
      <div className="container">
        <div className="form">
          <FontAwesomeIcon onClick={closeForm} icon={faXmark} />
          <h2>{mode === "add" ? "add movie" : "edit movie"}</h2>
          <form>
            <label className="title" htmlFor="title">
              TITLE
              <input
                value={title}
                onBlur={handleBlur}
                onChange={handleInput}
                id="title"
                type="text"
                placeholder="Movie title"
              />
              {!title && attemptedSubmit && (
                <p className="error">Title is required.</p>
              )}
            </label>

            <label className="date" htmlFor="date">
              RELEASE DATE
              <input
                value={date}
                onChange={handleInput}
                id="date"
                type="date"
              />
              {!date && attemptedSubmit && (
                <p className="error">Date is required.</p>
              )}
            </label>
            <label className="poster" htmlFor="poster">
              POSTER URL
              <input
                value={poster}
                onBlur={handleBlur}
                onChange={handleInput}
                id="poster"
                type="text"
                placeholder="https://"
              />
              {!poster && attemptedSubmit && (
                <p className="error">Poster url is required.</p>
              )}
            </label>
            <label className="rating" htmlFor="rating">
              RATING
              <input
                value={rating}
                onBlur={handleBlur}
                onChange={handleInput}
                id="rating"
                type="text"
                placeholder="7.8"
              />
              {!rating && attemptedSubmit && (
                <p className="error">Rating is required.</p>
              )}
            </label>
            <label className="genre" htmlFor="genre">
              GENRE
              <select value={genre} onChange={handleInput} id="genre">
                <option value="" defaultChecked>
                  Select Genre
                </option>
                <option value="crime">Crime</option>
                <option value="documentary">Documentary</option>
                <option value="horror">Horror</option>
                <option value="comedy">Comedy</option>
              </select>
              {!genre && attemptedSubmit && (
                <p className="error">Genre is required.</p>
              )}
            </label>
            <label className="duration" htmlFor="duration">
              RUNTIME
              <input
                value={duration}
                onBlur={handleBlur}
                onChange={handleInput}
                id="duration"
                type="text"
                placeholder="minutes"
              />
              {!duration && attemptedSubmit && (
                <p className="error">Duration is required.</p>
              )}
            </label>
            <label className="description" htmlFor="description">
              OVERVIEW
              <textarea
                value={description}
                onBlur={handleBlur}
                onChange={handleInput}
                id="description"
                placeholder="Movie description"
              />
              {!description && attemptedSubmit && (
                <p className="error">Description is required.</p>
              )}
            </label>
            <div className="buttons">
              <button onClick={reset} type="button" className="buttons__reset">
                reset
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="buttons__submit"
              >
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
