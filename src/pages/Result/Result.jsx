import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

import "./Result.css";
import ErrorResponse from "../../components/ErrorResponse/ErrorResponse";
import NumberInput from "../../components/NumberInput/NumberInput";
import Dropdown from "../../components/Dropdown/Dropdown";

const Result = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [subsData, setSubsData] = useState([]);
  const [failedToLoadChannels, setFailedToLoadChannels] = useState([]);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [numberValue, setNumberValue] = useState(6);
  const [dropdownValue, setDropdownValue] = useState("month(s)");
  const [isAscending, setIsAscending] = useState("from new to old");

  const { state } = useLocation();

  //https://yt-graveyard-server-grjdh.vercel.app
  //http://localhost:3000

  //sending access_token or channel ID to backend
  useEffect(() => {
    const getSubsData = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const serverResponse = await fetch("https://yt-graveyard-server-grjdh.vercel.app", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(state),
      });

      if (serverResponse.ok) {
        const jsonListOfSubs = await serverResponse.json();

        setSubsData(jsonListOfSubs.body);
        setFailedToLoadChannels(jsonListOfSubs.failedToLoadChannels);
        // console.log(jsonListOfSubs.body);
        // console.log(jsonListOfSubs.failedToLoadChannels);

        setIsFetching(false);
      } else {
        const error = await serverResponse.json();
        setError(error.error);
        setIsFetching(false);
        console.error("Error:", error.error);
      }
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

  // time options
  const dateOptions = ["month(s)", "year(s)"];
  //sorting options
  const sortOptions = ["from new to old", "from old to new"];

  //show loader while waiting for backend response or show an error if they didn't log in
  const renderContent = () => {
    if (!state)
      return <ErrorResponse text="You didn't login into your Google Account or provided Youtube channel ID!" />;
    else if (isFetching) return <Loading text="Walking to graveyard..." />;
    else if (error) return renderError();
    else return renderGrid();
  };

  //actual content
  const renderGrid = () => {
    return (
      <div className="result-page">
        <p>Here are YouTube channels that haven't released a video in at least...</p>
        <div className="controls">
          <NumberInput
            text="Filter by number of..."
            min={1}
            value={numberValue}
            onChange={e => setNumberValue(e.target.value)}
          />
          <Dropdown
            text="...months or years"
            onChange={e => setDropdownValue(e.target.value)}
            value={dropdownValue}
            options={dateOptions}
          ></Dropdown>
          <Dropdown
            text="Sort by..."
            onChange={e => setIsAscending(e.target.value)}
            value={isAscending}
            options={sortOptions}
          ></Dropdown>
        </div>
        {filteredAndSortedData.length === 0 ? (
          <p className="no-results highlight">No results found!</p>
        ) : (
          <div className="cards-grid">
            {(isAscending === "from new to old" ? [...filteredAndSortedData].reverse() : filteredAndSortedData).map(
              (element, i) => (
                <Card
                  key={i}
                  channelID={element.channelID}
                  channelThumbnail={element.channelThumbnail}
                  channelTitle={element.channelTitle}
                  lastVideoID={element.lastVideoID}
                  lastVideoThumbnail={element.lastVideoThumbnail}
                  lastVideoTitle={element.lastVideoTitle}
                  lastVideoDate={element.lastVideoDate}
                />
              )
            )}
          </div>
        )}
        {failedToLoadChannels.length > 0 && (
          <p>...and here are the channels where we couldn't find the latest video :(</p>
        )}
        <div className="cards-grid">
          {failedToLoadChannels.sort().map((element, i) => (
            <Card
              failed
              key={i}
              channelID={element.channelID}
              channelThumbnail={element.channelThumbnail}
              channelTitle={element.channelTitle}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderError = () => {
    switch (error) {
      case "subscriberNotFound":
        return <ErrorResponse text="Channel with this channel ID does not exist." />;
      case "subscriptionForbidden":
        return <ErrorResponse text="You forgot to make your subscriptions public." />;
      case "quotaExceeded":
        const whenQuotaResetsInPST = DateTime.fromObject({ hour: 0, minute: 0, second: 0 }, { zone: "pst" });
        const whenQuotaResetsInLocal = whenQuotaResetsInPST.toLocal().toLocaleString(DateTime.TIME_SIMPLE);
        return (
          <ErrorResponse
            text={
              "Sorry, but it looks like we exceeded our API quota. Please, try again after " +
              whenQuotaResetsInLocal +
              " in your local time."
            }
          />
        );
      default:
        return <ErrorResponse text="Something went wrong. Please try again later." />;
    }
  };

  return renderContent();
};

export default Result;
