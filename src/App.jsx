import { Outlet } from "react-router-dom";

import "./App.css";

import Title from "./components/Title/Title";
import Loading from "./components/Loading/Loading";
import { useEffect } from "react";
const App = () => {
  //username cannot be empty or

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  return (
    <div className="App">
      <Title />

      <Loading text="Walking to graveyard..." />

      {/* <Outlet /> */}
    </div>
  );
};

export default App;
