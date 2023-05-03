import { Outlet } from "react-router-dom";

import "./App.css";

import Title from "./components/Title/Title";
// import Loading from "./components/Loading/Loading";
import { useEffect } from "react";
const App = () => {
  //dirty trick
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  console.log(import.meta.env.VITE_SERVER_URL);
  console.log(import.meta.env.MODE);

  return (
    <div className="App">
      <Title />

      {/* <Loading text="Walking to graveyard..." /> */}

      <Outlet />
    </div>
  );
};

export default App;
