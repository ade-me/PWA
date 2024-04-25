import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router

function ScratchAvatar() {
  const navigate = useNavigate(); // Get the history object from React Router

  // Initialize state to hold the avatar image data URL
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to track loading state
  const inputRef = useRef(null);

  const handleCapture = () => {
    handleImageUpload(); // Call handleImageUpload to open the camera
  };

  // Function to handle image capture from the camera
  const handleImageUpload = () => {
    setLoading(true); // Set loading state to true
    // Constraints to capture image from the front camera
    const frontCameraConstraints = {
      video: {
        facingMode: { exact: 'user' } // 'user' for front camera
      }
    };

    // Constraints to capture image from the back camera
    const backCameraConstraints = {
      video: {
        facingMode: { exact: 'environment' } // 'environment' for back camera
      }
    };

    // Try to access the front camera first
    navigator.mediaDevices.getUserMedia(frontCameraConstraints)
      .then(handleStream)
      .catch(() => {
        // If front camera is not available, try accessing the back camera
        navigator.mediaDevices.getUserMedia(backCameraConstraints)
          .then(handleStream)
          .catch((error) => {
            console.error('Error accessing camera:', error);
            setError('Error accessing camera. Please try again.'); // Set error state
            setLoading(false); // Set loading state to false
          });
      });
  };

  // Function to handle the obtained stream
  const handleStream = (stream) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png'); // Convert canvas to data URL
        
        // Basic validation example: Check if the captured image is not blank
        if (!isBlankImage(canvas)) {
          setAvatar(imageDataUrl); // Update the avatar state with the captured image data URL
          setError(null);
          sendImageToBackend(imageDataUrl); // Send image to backend
        } else {
          setError('Captured image is blank. Please try again.');
          setLoading(false); // Set loading state to false
        }
      }, 15000);
    };
  };

  // Function to check if the captured image is blank
  const isBlankImage = (canvas) => {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] !== 255 || pixels[i + 1] !== 255 || pixels[i + 2] !== 255) {
        return false;
      }
    }

    return true;
  };

  // Function to send image to backend
  const sendImageToBackend = (imageDataUrl) => {
    // Simulate sending image to backend (replace with actual backend API call)
    setTimeout(() => {
      setLoading(false); // Set loading state to false
      console.log('Image sent to backend:', imageDataUrl);
      // Navigate to another page after uploading
      navigate('#'); // Navigate to the '/uploaded-image' route
    }, 8000); // Simulated delay of 15 seconds
  };

  return (
    <div className="avatar-generator-page flex items-center justify-center h-[100vh]">
    {loading ? (<p className="text-black flex items-center justify-center w-[100vw] h-[100vh] bg-white">Loading...</p>) :(
      <div className="Avatar-generator-box flex flex-col items-center justify-center">
        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
        
        <div className="Generated-avatar-container w-[15rem] h-[15rem] bg-gray-300 rounded-[50%] mb-9">
          {avatar && (
            <img src={avatar} alt="Generated Avatar" /> // Display the captured image
          )}
        </div>
        <h1 className="mt-4 mb-9 md:flex w-[80%] items-center justify-center text-center">Take a photo and we’ll use it to create your avatar</h1>
        {/* Replace the existing file input with the camera capture button */}
        <div className="flex flex-col items-center justify-center w-[5rem] h-[5rem] bg-white shadow-xl p-4 rounded-[50%]" onClick={handleCapture}>
          <label htmlFor="upload-input" className="w-[100%] h-[100%] bg-transparent flex items-center justify-center">
            <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.25 3.875L20.6667 0H10.3333L7.75 3.875H0V25.8333H31V3.875H23.25ZM28.4167 12.9167H23.148C23.8984 17.7656 20.1616 21.9583 15.5 21.9583C10.8345 21.9583 7.10287 17.763 7.85204 12.9167H2.58333V6.45833H9.13208L11.7154 2.58333H19.2833L21.8666 6.45833H28.4167V12.9167ZM15.5 9.04167C12.6028 9.04167 10.3333 11.2763 10.3333 14.1295C10.3333 17.0216 12.6506 19.375 15.5 19.375C18.3494 19.375 20.6667 17.0216 20.6667 14.1295C20.6667 11.2763 18.3972 9.04167 15.5 9.04167ZM14.9368 13.6335C14.1205 14.2833 13.0497 14.2794 12.5447 13.6258C12.0409 12.9722 12.2941 11.9156 13.1104 11.2659C13.9267 10.6175 14.9975 10.6214 15.5013 11.275C16.0063 11.9273 15.7532 12.9838 14.9368 13.6335Z" fill="black" />
            </svg>
          </label>
          <input
            id="upload-input"
            type="file"
            ref={inputRef}
            accept="image/*;capture=camera"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div> 
      </div>
      )}
    </div>
  );
}

export default ScratchAvatar;
