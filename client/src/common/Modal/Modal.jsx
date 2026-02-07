import React, { useState } from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const Modal = ({
  activeModal,
  setActiveModal,
  currentMovie: { id },
  setMovies,
}) => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
      setActiveModal(false);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
      document.body.style.overflow = "";
    },
    confirm = async () => {
      try {
        const response = await fetch(`http://localhost:4000/movies/${id}`, {
          method: "DELETE",
          "Content-Type": "application/json",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Deleted successfully", data);
          setMovies((prev) => prev.filter((movie) => movie.id !== id));
          setSuccess(true);
          navigate("/movies");
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
      {!success ? (
        <>
          <h2>delete movie</h2>
          <p>Are you sure you want to delete this movie?</p>
          <button onClick={confirm} className="confirm">
            confirm
          </button>
        </>
      ) : (
        <>
          <div className="check_wrapper">
            <FontAwesomeIcon className="check" icon={faCheck} />
          </div>
          <h2 className="congrats">congratulations!</h2>
          <p>The movie has been successfully deleted!</p>
        </>
      )}
    </div>
  );
};

export default Modal;
