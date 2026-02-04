import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import UserForm from "./components/forms/UserForm/UserForm";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [mode, setMode] = useState("");
  const [auth, setAuth] = useState(localStorage.getItem("auth"));

  useEffect(() => {});

  return (
    <>
      <Header auth={auth} />
      <UserForm mode={mode} />
      <Footer />
    </>
  );
};

export default App;
