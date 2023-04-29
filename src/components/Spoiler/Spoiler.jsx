import "./Spoiler.css";

const Spoiler = ({ children, title }) => {
  return (
    <div className="spoiler-container">
      <label className="spoiler-label">
        <div className="spoiler-text">
          <div className="spoiler-qm">?</div>
          <p>{title}</p>
        </div>
        <input type="checkbox" />
      </label>

      <div className="spoiler-content">{children}</div>
    </div>
  );
};

export default Spoiler;
