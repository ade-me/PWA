import React, { useRef } from 'react';

function CameraInput({ onCapture }) {
  const inputRef = useRef(null);

  const handleCapture = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Do something with the captured image
      onCapture(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*;capture=camera"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleCapture}>Capture</button>
    </div>
  );
}

export default CameraInput;
