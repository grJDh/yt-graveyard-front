import "./Input.css";

const Input = ({ text, placeholder, onChange }) => {
  return (
    <label>
      <span>{text}</span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
