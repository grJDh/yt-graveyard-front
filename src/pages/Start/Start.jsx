import "./Start.css";

const Start = ({ setPage }) => {
  return (
    <div className="start-page">
      In order for the site to see your subscriptions, you need to make them public. You can do this by following this
      link and turning off the "Keep al my subscriptions private" setting. Don't worry - you can turn it back on later!
      <button onClick={() => setPage("grid")}>Start</button>
    </div>
  );
};

export default Start;
