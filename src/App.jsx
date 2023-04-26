import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";

import "./App.css";

import subsData from "./response.json";

import CardsGrid from "./pages/CardsGrid/CardsGrid";
import ManualSteps from "./pages/Manual/Manual";
import Start from "./pages/Start/Start";
import GoogleAuth from "./pages/GoogleAuth/GoogleAuth";
import Loading from "./components/Loading/Loading";

const App = () => {
  const [page, setPage] = useState("manual_privacy");
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

  const renderContent = () => {
    /*
      main - main menu
      auth - google auth
      manual_privacy - show how to disable privacy settings
      manual_username - enter username or channelid
      loading - showing loading spinner
      cards_grid - showing result
    */

    switch (page) {
      case "cards_grid":
        return (
          <CardsGrid
            filteredAndSortedData={filteredAndSortedData}
            dropdownValue={dropdownValue}
            numberValue={numberValue}
            setNumberValue={setNumberValue}
            setDropdownValue={setDropdownValue}
          />
        );
      default:
        return (
          <ManualSteps
            page={page}
            setPage={setPage}
          />
        );
    }
  };

  return (
    <div className="App">
      <h1>Youtube Graveyard ⚰️</h1>
      <Outlet />
      {/* {renderContent()} */}
      {/* <Start /> */}
      {/* <Loading /> */}
      {/* <GoogleOAuthProvider clientId="227087509653-vebn36qaass89cpfm6q76n2ri0vevvtk.apps.googleusercontent.com">
        <GoogleAuth />
      </GoogleOAuthProvider> */}
    </div>
  );
};

export default App;
