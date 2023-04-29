import "./Input.css";

const Input = ({ text, placeholder, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
