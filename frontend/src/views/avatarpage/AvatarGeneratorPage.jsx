import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AvatarGeneratorPage() {
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    
    // Check if a file was actually selected
    if (!uploadedImage) {
      console.error("No image selected");
      return;
    }

    // Check if the selected file is an image
    if (!uploadedImage.type.startsWith('image/')) {
      console.error("Selected file is not an image");
      return;
    }

    // Set the image state and preview it
    setImage(uploadedImage);
    setAvatar(URL.createObjectURL(uploadedImage));
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
