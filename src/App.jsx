import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import "./App.css";

import Card from "./components/Card/Card";

import subsData from "./response.json";
import Slider from "./components/Slider/Slider";

const App = () => {
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [numberValue, setNumberValue] = useState(6);
  const [dropdownValue, setDropdownValue] = useState("month(s)");

  const filterData = data => {
    const filteredData = data.filter(element => {
      const uploadDate = DateTime.fromISO(element.lastVideoDate);
      let difference = {};
      switch (dropdownValue) {
        case "week(s)":
          difference = uploadDate.diffNow("days").toObject();
          return Math.abs(difference.days) >= numberValue * 7;
        case "year(s)":
          difference = uploadDate.diffNow("years").toObject();
          return Math.abs(difference.years) >= numberValue;
        default:
          difference = uploadDate.diffNow("months").toObject();
          return Math.abs(difference.months) >= numberValue;
      }
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

  const sliderSteps = [
    "1 week(s)",
    "2 week(s)",
    "3 week(s)",
    "4 week(s)",
    "1 month(s)",
    "2 month(s)",
    "3 month(s)",
    "4 month(s)",
    "5 month(s)",
    "6 month(s)",
    "7 month(s)",
    "8 month(s)",
    "9 month(s)",
    "10 month(s)",
    "11 month(s)",
    "12 month(s)",
    "1 year(s)",
    "2 year(s)",
    "3 year(s)",
    "4 year(s)",
    "5 year(s)",
  ];

  const dateOptions = ["week(s)", "month(s)", "year(s)"];

  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      setFilteredAndSortedData(sortData(filterData(subsData)));
    }, 1000);

    return () => clearTimeout(debounceDelay);
  }, [numberValue, dropdownValue]);

  const handleSetNumberValue = value => {
    const sliderValue = sliderSteps[value];
    const numInputValue = parseInt(sliderValue.substring(0, sliderValue.indexOf(" ")));

    let dropdownValue = "month(s)";
    if (sliderValue.includes("year(s)")) dropdownValue = "year(s)";
    else if (sliderValue.includes("week(s)")) dropdownValue = "week(s)";
    else dropdownValue = "month(s)";

    setNumberValue(numInputValue);
    setDropdownValue(dropdownValue);
  };

  // useEffect(() => {
  //   setFilteredData(filterData(subsData));
  // }, [numberValue]);

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

  console.log(numberValue.toString() + " " + dropdownValue);

  return (
    <div className="App">
      <div className="controls">
        <Slider
          handleSetNumberValue={handleSetNumberValue}
          // numberValue={numberValue}
          currentStep={sliderSteps.indexOf(numberValue.toString() + " " + dropdownValue)}
        />
        <input
          min={0}
          type="number"
          value={numberValue}
          onChange={e => setNumberValue(e.target.value)}
        />
        <select
          onChange={e => setDropdownValue(e.target.value)}
          value={dropdownValue}
        >
          {dateOptions.map((option, i) => (
            <option
              key={i}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
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
