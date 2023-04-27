import { useNavigate } from "react-router-dom";

import "./Manual.css";

import yt_privacy from "../../assets/yt_privacy.png";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";

const Manual = () => {
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleSetToken = event => setToken(event.target.value);

  return (
    <div className="manual-steps">
      <p>
        In order for the site to see your subscriptions, you need to make them public. You can do this by following{" "}
        <a href="https://www.youtube.com/account_privacy">this link</a> and turning off the "Keep all my subscriptions
        private" setting. Don't worry - you can turn it back on later!
      </p>
      <p>After that, enter your @Handle or channel ID here:</p>
      <Input
        placeholder="@YourHandle/YourChannelID"
        text="Your handle or channel ID here"
        onChange={handleSetToken}
      />
      <Button
        text="I did it!"
        onClick={() =>
          navigate("/result", {
            state: {
              type: "manual",
              token: token,
            },
          })
        }
      />
      <img
        src={yt_privacy}
        alt='"Keep all my subscriptions private" setting'
      />
      {/* <img
        src={yt_privacy}
        alt='"Keep all my subscriptions private" setting'
      /> */}
    </div>
  );
};

export default Manual;
