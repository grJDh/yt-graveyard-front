import { useState } from "react";
import "./CardsGrid.css";
import Slider from "../../components/Slider/Slider";
import Card from "../../components/Card/Card";

const CardsGrid = ({ filteredAndSortedData, dropdownValue, numberValue, setNumberValue, setDropdownValue }) => {
  const [isAscending, setIsAscending] = useState(true);

  // dropdown options
  const dateOptions = ["week(s)", "month(s)", "year(s)"];

  //slider steps
  const sliderSteps = [
    "1 week(s)",
    "2 week(s)",
    "3 week(s)",
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

  return (
    <div className="cards-grid-page">
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

export default CardsGrid;
