import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as faceapi from 'face-api.js'; // Import face-api.js for face detection

function ScratchAvatar() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Load face-api.js models when the component mounts
  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]).catch(error => console.error('Error loading face-api models:', error));
  }, []);

  const handleCapture = async () => {
    const isFaceDetected = await detectFace(); // Detect face before capturing
    if (isFaceDetected) {
      handleImageUpload(); // If face detected, capture image
    } else {
      setError('No face detected. Please try again.');
    }
  };

  const detectFace = async () => {
    try {
      const constraints = {
        video: true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
      stream.getTracks().forEach(track => track.stop());
      return !!result;
    } catch (error) {
      console.error('Error detecting face:', error);
      return false;
    }
  };

  const handleImageUpload = async () => {
    try {
      const constraints = {
        video: true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');

      video.addEventListener('play', () => {
        const draw = () => {
          if (video.paused || video.ended) {
            return;
          }
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(draw);
        };
        draw();
      });

      setTimeout(() => {
        const imageDataUrl = canvas.toDataURL('image/png');
        setAvatar(imageDataUrl);
        sendImageToBackend(imageDataUrl);
        stream.getTracks().forEach(track => track.stop());
      }, 1000);
    } catch (error) {
      console.error('Error capturing image:', error);
      setError('Error capturing image. Please try again.');
    }
  };

  const sendImageToBackend = (imageDataUrl) => {
    // Convert data URL to Blob
    fetch(imageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        // Create FormData object to send file
        const formData = new FormData();
        formData.append('avatar', blob, 'avatar.png');
  
        // Replace 'http://example.com/upload' with your actual backend API endpoint
        axios.post('http://example.com/upload', formData, {
        })
        .then(response => {
          console.log('Image sent to backend:', response.data);
          // Navigate to another page after uploading
          navigate('/configurator'); // Navigate to the '/configurator' route
        })
        .catch(error => {
          console.error('Error sending image to backend:', error);
          setError('Error sending image to backend. Please try again.'); // Set error state
        });
      })
      .catch(error => {
        console.error('Error converting image data:', error);
        setError('Error converting image data. Please try again.'); // Set error state
      });
  };
  

  return (
    <div className="avatar-generator-page flex items-center justify-center h-[100vh]">
      <div className="Avatar-generator-box flex flex-col items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="Generated-avatar-container w-[15rem] h-[15rem] bg-gray-300 rounded-[50%] mb-9">
          {avatar && (
            <img src={avatar} alt="Generated Avatar" />
          )}
        </div>
        <h1 className="mt-4 mb-9 md:flex w-[80%] items-center justify-center text-center">Take a photo and we’ll use it to create your avatar</h1>
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
    </div>
  );
}

export default ScratchAvatar;
