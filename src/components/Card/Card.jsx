import { DateTime } from "luxon";
import "./Card.css";

const Card = ({ data }) => {
  const formatDate = date => {
    const uploadDate = DateTime.fromISO(date);
    const difference = uploadDate.diffNow("days").toObject();

    const relative = DateTime.now().plus(difference).toRelative();

    return uploadDate.toLocaleString(DateTime.DATE_FULL) + " (" + relative + ")";
  };

  return (
    <div className="card">
      <a
        href={"https://www.youtube.com/channel/" + data.channelId}
        className="channel-warper-a"
      >
        <div className="channel-warper">
          <img src={data.thumbnail} />
          <h2 className="text-overflow">{data.title}</h2>
        </div>
      </a>
      <span className="border"></span>
      <a
        href={"https://youtube.com/watch?v=" + data.lastVideoID}
        className="channel-warper-a"
      >
        <div className="video-warper">
          <div className="thimbnail">
            <img src={data.lastVideoThumbnail} />
            <span className="video-date">{formatDate(data.lastVideoDate)}</span>
          </div>
          <h2 className="text-overflow">{data.lastVideoTitle}</h2>
        </div>
      </a>
    </div>
  );
};

export default Card;
