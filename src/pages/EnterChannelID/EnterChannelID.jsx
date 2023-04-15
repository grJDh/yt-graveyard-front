import "./EnterChannelID.css";

const EnterChannelID = ({ setPage }) => {
  return (
    <div className="start-page">
      Great! Now, please, enter your channel ID here.
      <input type="text" />
      <button onClick={() => setPage("cards_grid")}>Start</button>
    </div>
  );
};

export default EnterChannelID;
