import { Outlet, Link } from "react-router-dom";

import "./App.css";
const App = () => {

  //username cannot be empty or 

  return (
    <div className="App">
      <Link to="/">
        <h1>Youtube Graveyard ⚰️</h1>
      </Link>

      <Outlet />
    </div>
  );
};

export default App;
