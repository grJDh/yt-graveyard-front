import { Outlet } from "react-router-dom";

import "./App.css";

import Title from "./components/Title/Title";
// import Loading from "./components/Loading/Loading";
const App = () => {
  //username cannot be empty or

  return (
    <div className="App">
      <Title />

      {/* <Loading text="Please, wait..." /> */}

      <Outlet />
    </div>
  );
};

export default App;
