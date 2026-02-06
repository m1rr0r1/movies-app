import React from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({
  activeModal,
  setActiveModal,
  currentMovie: { id },
  setMovies,
}) => {
  const closeModal = () => {
      setActiveModal(false);
      document.body.style.overflow = "";
    },
    confirm = async () => {
      setActiveModal(false);
      document.body.style.overflow = "";
      try {
        const response = await fetch(`http://localhost:4000/movies/${id}`, {
          method: "DELETE",
          "Content-Type": "application/json",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Deleted successfully", data);
          setMovies((prev) => prev.filter((movie) => movie.id !== id));
          return true;
        } else {
          console.log(
            "Delete failed",
            response.status + " " + response.statusText,
          );
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    };

  return (
    <div className={activeModal ? "modal activeModal" : "modal"}>
      <FontAwesomeIcon
        onClick={closeModal}
        className="close_modal"
        icon={faXmark}
      />
      <h2>delete movie</h2>
      <p>Are you sure you want to delete this movie?</p>
      <button onClick={confirm} className="confirm">
        confirm
      </button>
    </div>
  );
};

export default Modal;
