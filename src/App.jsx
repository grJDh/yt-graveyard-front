import { useEffect, useState } from "react";
import "./App.css";

import Card from "./components/Card/Card";

import subsData from "./response.json";

const App = () => {
  // let myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  // const data = { channelID: channelID };

  // useEffect(() => {
  //   fetch("http://localhost:3000/", {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => response.json())
  //     .then(response => console.log(JSON.stringify(response)));
  // }, []);

  //TODO: replace flex with grid in App
  return (
    <div className="App">
      {subsData.map((data, i) => (
        <Card
          data={data}
          key={i}
        />
      ))}
    </div>
  );
};

export default App;
