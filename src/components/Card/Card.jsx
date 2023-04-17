import { DateTime } from "luxon";
import "./Card.css";

const Card = ({ channelId, thumbnail, title, lastVideoID, lastVideoThumbnail, lastVideoTitle, lastVideoDate }) => {
  const formatDate = date => {
    const uploadDate = DateTime.fromISO(date);
    const difference = uploadDate.diffNow("days").toObject();

    const relative = DateTime.now().plus(difference).toRelative();

    return uploadDate.toLocaleString(DateTime.DATE_FULL) + " (" + relative + ")";
  };

  return (
    <div className="card">
      <a
        href={"https://www.youtube.com/channel/" + channelId}
        className="a-warper"
      >
        <div className="channel-warper">
          <img src={thumbnail} />
          <h2 className="text-overflow">{title}</h2>
        </div>
      </a>
      <span className="border"></span>
      <a
        href={"https://youtube.com/watch?v=" + lastVideoID}
        className="a-warper"
      >
        <div className="video-warper">
          <div className="thumbnail">
            <img src={lastVideoThumbnail} />
            <p className="video-date">{formatDate(lastVideoDate)}</p>
          </div>
          <p className="text-overflow">{lastVideoTitle}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;
