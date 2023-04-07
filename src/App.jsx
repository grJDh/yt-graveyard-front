import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import "./App.css";

import Card from "./components/Card/Card";

import subsData from "./response.json";

const App = () => {
  const filterData = data => {
    const filteredData = data.filter(element => {
      const uploadDate = DateTime.fromISO(element.lastVideoDate);
      const difference = uploadDate.diffNow("days").toObject();
      return Math.abs(difference.days) > maxTime;
    });

    return filteredData;
  };

  const sortData = data => {
    const sortedData = data.sort((a, b) => {
      const aDate = DateTime.fromISO(a.lastVideoDate);
      const bDate = DateTime.fromISO(b.lastVideoDate);

      const dateDifference = aDate.diff(bDate, "days").toObject();

      return dateDifference.days;
    });

    return sortedData;
  };

  const [maxTime, setMaxTime] = useState(180);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState(filterData(subsData));
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      setFilteredAndSortedData(sortData(filterData(subsData)));
    }, 1000);

    return () => clearTimeout(debounceDelay);
  }, [maxTime]);

  // useEffect(() => {
  //   setFilteredData(filterData(subsData));
  // }, [maxTime]);

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
      <div className="controls">
        <input
          type="range"
          min="0"
          max="180"
          value={maxTime}
          onChange={e => setMaxTime(e.target.value)}
        />
        <input
          min={0}
          type="number"
          value={maxTime}
          onChange={e => setMaxTime(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isAscending}
            onChange={() => setIsAscending(prevValue => !prevValue)}
          />
          <p>Reverse order</p>
        </label>
      </div>
      <div className="card-grid">
        {(isAscending ? filteredAndSortedData.slice().reverse() : filteredAndSortedData).map((data, i) => (
          <Card
            data={data}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
