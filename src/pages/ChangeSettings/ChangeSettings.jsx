import "./ChangeSettings.css";

const ChangeSettings = ({ setPage }) => {
  return (
    <div className="change-settings-page">
      In order for the site to see your subscriptions, you need to make them public. You can do this by following
      <a href="https://www.youtube.com/account_privacy"> this link</a> and turning off the "Keep all my subscriptions
      private" setting. Don't worry - you can turn it back on later!
      <button onClick={() => setPage("enter_channel_id")}>Start</button>
    </div>
  );
};

export default ChangeSettings;
