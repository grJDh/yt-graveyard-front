const Slider = ({ currentStep, handleSetNumberValue }) => {
  // console.log(currentStep);
  return (
    <div>
      <input
        type="range"
        min={0}
        max={15}
        step={1}
        onChange={e => handleSetNumberValue(e.target.value)}
        value={currentStep}
      />
    </div>
  );
};

export default Slider;
