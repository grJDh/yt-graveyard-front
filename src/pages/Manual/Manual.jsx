import { useNavigate } from "react-router-dom";

import "./Manual.css";

import yt_privacy from "../../assets/yt_privacy.png";

import Button from "../../components/Buttons/Button";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";

const Manual = () => {
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleSetToken = event => setToken(event.target.value);

  return (
    <div className="manual-steps">
      <p>
        In order for the site to see your subscriptions, <span className="highlight">you need to make them public</span>
        . You can do this by following{" "}
        <a
          href="https://www.youtube.com/account_privacy"
          className="highlight"
        >
          this link
        </a>{" "}
        and turning off the <span className="highlight">"Keep all my subscriptions private"</span> setting. Don't worry
        - you can turn it back on later!
      </p>
      <p>After that, enter your @handle or channel ID here:</p>
      <div className="manual-input">
        <Input
          placeholder="@YourHandle/YourChannelID"
          text="Your handle or channel ID here"
          onChange={handleSetToken}
        />
        <Button
          text="Continue"
          main
          onClick={() =>
            navigate("/result", {
              state: {
                type: "manual",
                token: token,
              },
            })
          }
        />
      </div>

      <img
        src={yt_privacy}
        alt='"Keep all my subscriptions private" setting'
      />
    </div>
  );
};

export default Manual;
