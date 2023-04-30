import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useNavigate, useLocation } from "react-router-dom";

import Card from "../../components/Card/Card";
import Button from "../../components/Buttons/Button";
import Loading from "../../components/Loading/Loading";

import "./Result.css";

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
      setSubsData(jsonListOfSubs.serverResponse);
      // console.log(jsonListOfSubs.serverResponse);
    };

    if (state) getSubsData();
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

    updateData();
  }, [subsData, numberValue, dropdownValue]);

  // dropdown options
  const dateOptions = ["month(s)", "year(s)"];

  //show loader while waiting for backend response or show an error if they didn't log in
  const renderContent = () => {
    if (!state)
      return (
        <div className="manual-steps">
          <p>You didn't log in your Google Account or provided Youtube channel ID!</p>
          <Button
            main
            text="Return to Start"
            onClick={() => navigate("/")}
          />
        </div>
      );
    else if (isFetching) return <Loading text="Loading your subscriptions..." />;
    else return renderGrid();
  };

  //actual content
  const renderGrid = () => {
    return (
      <div className="result-page">
        <div className="controls">
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
