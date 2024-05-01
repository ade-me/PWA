import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import { toast } from 'react-hot-toast';

function AvatarGeneratorPage() {
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load face-api.js models
    loadFaceApiModels();
  }, []);

  const loadFaceApiModels = async () => {
    try {
      // Load face-api.js models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'), // Load face detection model
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'), // Load face landmarks model
        faceapi.nets.faceRecognitionNet.loadFromUri('/models') // Load face recognition model
      ]);
      console.log('Face-api models loaded successfully.');
    } catch (error) {
      toast.error('Error loading face-api models:', error);
    }
  };
  

  const handleImageUpload = async (event) => {
    const uploadedImage = event.target.files[0];
  
    if (!uploadedImage) {
      toast.error("No image selected");
      return;
    }
  
    if (!uploadedImage.type.startsWith('image/')) {
      toast.error("Selected file is not an image");
      return;
    }
  
    const imageDataUrl = URL.createObjectURL(uploadedImage);
  
    const img = document.createElement('img');
    img.src = imageDataUrl;
  
    img.onload = async () => {
      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().run();
      if (detections.length > 0) {
        console.log('Faces detected:', detections.length);
        setImage(img);
        setAvatar(imageDataUrl);
        sendImageToBackend(uploadedImage);
      } else {
        toast.error("No faces detected");
        // Handle case where no faces are detected
      }
    };
  
    img.onerror = () => {
      toast.error("Error loading image");
    };
  };
  
  
  
  

  const sendImageToBackend = (imageDataUrl) => {
    fetch(imageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('avatar', blob, 'avatar.png');

        axios.post('http://example.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          toast.success('Image sent to backend:', response.data);
          navigate('/configurator');
        })
        .catch(error => {
          toast.error('Error sending image to backend:', error);
        });
      })
      .catch(error => {
        toast.error('Error converting image data:', error);
      });
  };

  return (
    <div className="avatar-generator-page flex items-center justify-center h-screen">
      <div className="Avatar-generator-box flex flex-col items-center justify-center">
        <div className="Generated-avatar-container w-48 h-48 bg-gray-300 rounded-full mb-4">
          {avatar && (      
            <img src={avatar} alt="Generated Avatar" className="w-full h-full object-cover rounded-full" />
          )}
        </div>
        <h1 className="text-2xl font-bold mt-4 mb-4">Create Your Avatar</h1>
        <div className="flex flex-col items-center justify-center w-64 gap-4">
          <label htmlFor="upload-input" className="w-full h-10 bg-gray-300 flex items-center justify-center rounded-[20px] cursor-pointer">
            Upload Image
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Link to='/scratch-avatar' className="w-full h-10 bg-gray-300 flex items-center justify-center rounded-[20px]">Create from scratch</Link>
        </div> 
      </div>
    </div>
  );
}

export default AvatarGeneratorPage;
