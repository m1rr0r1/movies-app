import React from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ activeModal, setActiveModal }) => {
  const closeModal = () => {
    setActiveModal(false);
    document.body.style.overflow = "";
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
      <button className="confirm">confirm</button>
    </div>
  );
};

export default Modal;
