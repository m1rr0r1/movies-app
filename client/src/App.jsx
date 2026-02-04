import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, replace } from "react-router";
import Header from "./components/Header/Header";
import UserForm from "./components/forms/UserForm/UserForm";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    !auth.token && navigate("/login", { replace: true });
    console.log(auth.token);
  }, []);

  return (
    <>
      <Header token={auth.token} />
      <Routes>
        <Route
          path="/login"
          element={<UserForm setAuth={setAuth} mode="login" />}
        />
        <Route
          path="/registration"
          element={<UserForm mode="registration" />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
