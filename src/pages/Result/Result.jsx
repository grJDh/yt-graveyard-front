import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useNavigate, useLocation } from "react-router-dom";

import Slider from "../../components/Slider/Slider";
import Card from "../../components/Card/Card";

import "./Result.css";
import Button from "../../components/Buttons/Button";

import { response } from "../../response.js";

const Result = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [subsData, setSubsData] = useState([]);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [numberValue, setNumberValue] = useState(6);
  const [dropdownValue, setDropdownValue] = useState("month(s)");
  const [isAscending, setIsAscending] = useState(true);

  const { state } = useLocation();
  const navigate = useNavigate();

  //sending access_token, username, and channel ID to backend
  useEffect(() => {
    const getSubsData = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const serverResponse = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(state),
      });
      const jsonListOfSubs = await serverResponse.json();
      setIsFetching(false);
      setSubsData(jsonListOfSubs);
      console.log(jsonListOfSubs);
    };

    // if (state) getSubsData();
    if (state) {
      setIsFetching(false);
      setSubsData(response);
    }
  }, [state]);

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
  }, [subsData, numberValue, dropdownValue]);

  // dropdown options
  const dateOptions = ["month(s)", "year(s)"];

  //slider steps
  const sliderSteps = [
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
    "1 year(s)",
    "2 year(s)",
    "3 year(s)",
    "4 year(s)",
    "5 year(s)",
  ];

  // set number value and dropdown value based on slider value
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

  //show loader while waiting for backend response
  const renderContent = () => {
    if (!state)
      return (
        <div className="manual-steps">
          <p>You didn't log in your Google Account or provided Youtube handle/channel ID!</p>
          <Button
            text="Return to Start"
            onClick={() => navigate("/")}
          />
        </div>
      );
    else if (isFetching)
      return (
        <div className="manual-steps">
          <p>Loading data, please wait...</p>
          <div className="lds-dual-ring"></div>
        </div>
      );
    else return renderGrid();
  };

  //actual content
  const renderGrid = () => {
    return (
      <div className="result-page">
        <div className="controls">
          <Slider
            handleSetNumberValue={handleSetNumberValue}
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
            Reverse sorting
          </label>
        </div>
        <div className="cards-grid">
          {(isAscending ? [...filteredAndSortedData].reverse() : filteredAndSortedData).map((element, i) => (
            <Card
              key={i}
              channelId={element.channelId}
              thumbnail={element.thumbnail}
              title={element.title}
              lastVideoID={element.lastVideoID}
              lastVideoThumbnail={element.lastVideoThumbnail}
              lastVideoTitle={element.lastVideoTitle}
              lastVideoDate={element.lastVideoDate}
            />
          ))}
        </div>
      </div>
    );
  };

  return renderContent();
  // return <div></div>;
};

export default Result;
