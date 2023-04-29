import { Outlet, Link } from "react-router-dom";

import "./App.css";

import Title from "./components/Title/Title";
const App = () => {
  //username cannot be empty or

  return (
    <div className="App">
      <Title />

      <Outlet />
    </div>
  );
};

export default App;
