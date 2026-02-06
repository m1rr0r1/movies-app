import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, replace } from "react-router";
import Header from "./components/Header/Header";
import UserForm from "./components/forms/UserForm/UserForm";
import Footer from "./components/Footer/Footer";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieForm from "./components/forms/MovieForm/MovieForm";
import Modal from "./common/Modal/Modal";

const App = () => {
  const [auth, setAuth] = useState({
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: localStorage.getItem("token") || null,
    }),
    [hideHeader, setHideHeader] = useState(false),
    [movies, setMovies] = useState([]),
    [query, setQuery] = useState(""),
    [totalAmount, setTotalAmount] = useState(""),
    [activeModal, setActiveModal] = useState(false),
    [currentMovie, setCurrentMovie] = useState({}),
    navigate = useNavigate();

  useEffect(() => {
    !auth.token
      ? navigate("/login", { replace: true })
      : navigate("/movies", { replace: true });
  }, []);

  const closeModal = () => {
    setActiveModal(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Header
        auth={auth}
        setAuth={setAuth}
        hideHeader={hideHeader}
        setHideHeader={setHideHeader}
        query={query}
        setQuery={setQuery}
        setMovies={setMovies}
        setTotalAmount={setTotalAmount}
      />
      <Routes>
        <Route
          path="/login"
          element={<UserForm setAuth={setAuth} mode="login" />}
        />
        <Route
          path="/registration"
          element={<UserForm mode="registration" />}
        />
        <Route
          path="/movies"
          element={
            <MoviesList
              setTotalAmount={setTotalAmount}
              totalAmount={totalAmount}
              query={query}
              movies={movies}
              setMovies={setMovies}
              role={auth.user.role}
              setActiveModal={setActiveModal}
              setCurrentMovie={setCurrentMovie}
            />
          }
        />
        <Route path="/movies/add" element={<MovieForm />} />
      </Routes>
      <Modal
        currentMovie={currentMovie}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        setMovies={setMovies}
      />
      {activeModal && <div onClick={closeModal} className="overlay"></div>}
      <Footer />
    </>
  );
};

export default App;
