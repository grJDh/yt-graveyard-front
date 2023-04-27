import { Outlet, Link } from "react-router-dom";

import "./App.css";
const App = () => {
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
