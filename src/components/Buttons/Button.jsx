import "./Buttons.css";

const Button = ({ text, onClick, main = false }) => {
  return (
    <button
      className={`button ${main ? "main-button" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
