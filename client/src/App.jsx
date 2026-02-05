import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, replace } from "react-router";
import Header from "./components/Header/Header";
import UserForm from "./components/forms/UserForm/UserForm";
import Footer from "./components/Footer/Footer";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieForm from "./components/forms/MovieForm/MovieForm";

const App = () => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  });
  const [hideHeader, setHideHeader] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    !auth.token
      ? navigate("/login", { replace: true })
      : navigate("/movies", { replace: true });
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
            />
          }
        />
        <Route path="/movies/add" element={<MovieForm />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
