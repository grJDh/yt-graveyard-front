import { DateTime } from "luxon";
import "./Card.css";

const Card = ({
  failed = false,
  channelID,
  channelThumbnail,
  channelTitle,
  lastVideoID,
  lastVideoThumbnail,
  lastVideoTitle,
  lastVideoDate,
}) => {
  const formatDate = date => {
    const uploadDate = DateTime.fromISO(date);
    const difference = uploadDate.diffNow("days").toObject();

    const relative = DateTime.now().plus(difference).toRelative();

    return uploadDate.toLocaleString(DateTime.DATE_FULL) + " (" + relative + ")";
  };

  return (
    <div className="card">
      <a
        href={"https://www.youtube.com/channel/" + channelID}
        className="a-warper"
        target="_blank"
        rel="noreferrer"
      >
        <div className="channel-warper">
          <img
            src={channelThumbnail}
            alt="Channel avatar"
          />
          <h2 className="text-overflow">{channelTitle}</h2>
        </div>
      </a>
      <span className="border"></span>
      {!failed && (
        <a
          href={"https://youtube.com/watch?v=" + lastVideoID}
          className="a-warper"
          target="_blank"
          rel="noreferrer"
        >
          <div className="video-warper">
            <div className="thumbnail">
              <img
                src={lastVideoThumbnail}
                alt="Last uploaded video thumbnail"
              />
              <p className="video-date">{formatDate(lastVideoDate)}</p>
            </div>
            <p className="text-overflow">{lastVideoTitle}</p>
          </div>
        </a>
      )}
    </div>
  );
};

export default Card;
