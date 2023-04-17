import "./ManualSteps.css";

import yt_privacy from "../../assets/yt_privacy.png";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const ManualSteps = ({ page, setPage }) => {
  const renderContent = () => {
    switch (page) {
      case "manual_id":
        return (
          <div className="manual-steps">
            <p>Great! Now, please, enter your channel ID</p>
            <Input
              type="text"
              placeholder="@YourUsername"
              text="Enter your channel ID here"
            />
            <Button
              text="I did it!"
              onClick={() => setPage("cards_grid")}
            />
            <img
              src={yt_privacy}
              alt='"Keep all my subscriptions private" setting'
            />
          </div>
        );
      default:
        return (
          <div className="manual-steps">
            <p>
              In order for the site to see your subscriptions, you need to make them public. You can do this by
              following <a href="https://www.youtube.com/account_privacy">this link</a> and turning off the "Keep all my
              subscriptions private" setting. Don't worry - you can turn it back on later!
            </p>
            <Button
              text="I did it!"
              onClick={() => setPage("manual_id")}
            />
            <img
              src={yt_privacy}
              alt='"Keep all my subscriptions private" setting'
            />
          </div>
        );
    }
  };

  return renderContent();
};

export default ManualSteps;
