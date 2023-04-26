import "./Start.css";

const Start = () => {
  return (
    <div className="start-container">
      <div className="auth-choice">
        <h2>I'm okay with logging in my Google account</h2>
        <p>or I don't know my Youtube username/channel ID</p>
      </div>
      <div className="username-choice">
        <h2>I don't want to log in my Google account</h2>
        <p>and I know my Youtube username/channel ID</p>
      </div>
    </div>
  );
};

export default Start;
