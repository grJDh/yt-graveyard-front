import { Link, useNavigate } from "react-router-dom";

import "./Manual.css";

import yt_privacy from "../../assets/guide/yt_privacy.png";
import channel_id from "../../assets/guide/channel_id.png";

import Button from "../../components/Buttons/Button";
import Input from "../../components/Input/Input";
import { useState } from "react";
import Spoiler from "../../components/Spoiler/Spoiler";

const Manual = () => {
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleSetToken = event => setToken(event.target.value);

  return (
    <div className="manual-steps">
      <p>
        If you don't want to login into your Google Account, then in order for the site to see your subscriptions, you
        need to <span className="highlight">make them public</span>. You can do this by following{" "}
        <a
          href="https://www.youtube.com/account_privacy"
          className="highlight"
        >
          this link
        </a>{" "}
        and turning off the <span className="highlight">"Keep all my subscriptions private"</span> setting. Don't worry
        - you can turn it back on later!
      </p>
      <p>After that, enter your channel ID here:</p>
      <div className="manual-input">
        <Input
          placeholder="YourChannelID"
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

      <Spoiler title="Where can I find my channel ID?">
        <p>
          Follow{" "}
          <a
            href="https://studio.youtube.com/"
            className="highlight"
          >
            this link
          </a>{" "}
          and look at the adress bar. See a bunch of characters after "channel/" that starts with a "UC"? That's your
          channel ID.{" "}
        </p>
        <p>
          <span className="highlight">If you don't have a channel</span>, then you can either create one or{" "}
          <Link
            className="highlight"
            to="/"
          >
            login into your Google Account
          </Link>{" "}
          instead
        </p>
        <img
          src={channel_id}
          alt="Where to find your channel ID"
        />
      </Spoiler>

      <Spoiler title="Where can I make my subscriptions public?">
        <p>
          Follow{" "}
          <a
            href="https://www.youtube.com/account_privacy"
            className="highlight"
          >
            this link
          </a>{" "}
        </p>
        <img
          src={yt_privacy}
          alt='"Keep all my subscriptions private" setting'
        />
      </Spoiler>
    </div>
  );
};

export default Manual;
