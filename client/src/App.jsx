import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate, useFetcher } from "react-router";
import Header from "./components/Header/Header";
import UserForm from "./components/forms/UserForm/UserForm";
import Footer from "./components/Footer/Footer";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieForm from "./components/forms/MovieForm/MovieForm";
import MovieDetails from "./components/MoviesList/components/MovieDetails/MovieDetails";
import Modal from "./common/Modal/Modal";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";

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
    [hideProfile, setHideProfile] = useState(false),
    navigate = useNavigate(),
    LIMIT = 6;

  const closeModal = () => {
    setActiveModal(false);
    document.body.style.overflow = "";
  };

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
        currentMovie={currentMovie}
        hideProfile={hideProfile}
        setHideProfile={setHideProfile}
        // setCurrentMovie={setCurrentMovie}
      />
      <Routes>
        <Route
          path="/"
          element={
            auth.token ? (
              <Navigate to="/movies" replace />
            ) : (
              <Navigate to="login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<UserForm setAuth={setAuth} mode="login" />}
        />
        <Route
          path="/registration"
          element={<UserForm mode="registration" />}
        />
        <Route element={<ProtectedLayout auth={auth} />}>
          <Route
            path="/movies"
            element={
              <MoviesList
                setTotalAmount={setTotalAmount}
                totalAmount={totalAmount}
                query={query}
                movies={movies}
                setMovies={setMovies}
                role={auth?.user?.role}
                setActiveModal={setActiveModal}
                setCurrentMovie={setCurrentMovie}
                setHideHeader={setHideHeader}
                setHideProfile={setHideProfile}
              />
            }
          />
          <Route
            path="/movies/:id"
            element={
              <MovieDetails
                setHideHeader={setHideHeader}
                setActiveModal={setActiveModal}
                movies={movies}
                setHideProfile={setHideProfile}
                role={auth?.user?.role}
              />
            }
          />
          <Route
            path="/movies/add"
            element={
              <MovieForm
                setHideHeader={setHideHeader}
                setHideProfile={setHideProfile}
                mode="add"
              />
            }
          />
          <Route
            path="/movies/edit/:id"
            element={
              <MovieForm
                setHideHeader={setHideHeader}
                setHideProfile={setHideProfile}
                mode="edit"
              />
            }
          />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
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
