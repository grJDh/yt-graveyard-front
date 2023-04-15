import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import "./App.css";

import subsData from "./response.json";
import CardsGrid from "./pages/CardsGrid/CardsGrid";
import Start from "./pages/Start/Start";

const App = () => {
  const [page, setPage] = useState("start");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [numberValue, setNumberValue] = useState(6);
  const [dropdownValue, setDropdownValue] = useState("month(s)");

  // filter data based on dropdown value and number value
  const filterData = async data => {
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

  // sort data based on last video date
  const sortData = async data => {
    const sortedData = [...data].sort((a, b) => {
      const aDate = DateTime.fromISO(a.lastVideoDate);
      const bDate = DateTime.fromISO(b.lastVideoDate);

      const dateDifference = aDate.diff(bDate, "days").toObject();

      return dateDifference.days;
    });

    return sortedData;
  };

  // update filtered and sorted data when dropdown or number value changes
  useEffect(() => {
    const updateData = async () => {
      const filteredData = await filterData(subsData);
      const sortedData = await sortData(filteredData);
      setFilteredAndSortedData(sortedData);
    };

    const debounceDelay = setTimeout(updateData, 1000);

    return () => clearTimeout(debounceDelay);
  }, [numberValue, dropdownValue]);

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

  //https://www.youtube.com/account_privacy

  const renderContent = () => {
    switch (page) {
      case "start":
        return <Start setPage={setPage} />;
      default:
        return (
          <CardsGrid
            filteredAndSortedData={filteredAndSortedData}
            dropdownValue={dropdownValue}
            numberValue={numberValue}
            setNumberValue={setNumberValue}
            setDropdownValue={setDropdownValue}
          />
        );
    }
  };

  return <div className="App">{renderContent()}</div>;
};

export default App;
