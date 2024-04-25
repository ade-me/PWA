// AvatarGeneratorPage.js
// import React, { useState } from 'react';

import { Link } from "react-router-dom";

function AvatarGeneratorPage() {
  // const [image, setImage] = useState(null);
  // const [avatar, setAvatar] = useState(null);

  // const handleImageUpload = (event) => {
  //   const uploadedImage = event.target.files[0];
  //   setImage(uploadedImage);

  //   // You may want to display a preview of the uploaded image here
  //   // For simplicity, I'm omitting the preview code in this example
  // };

  // const generateAvatar = () => {
  //   // Your avatar generation logic goes here
  //   // This is a placeholder for the actual implementation
  //   // You can use libraries like Avatar.js or any other method to generate avatars
  //   // For now, let's set the uploaded image as the avatar
  //   setAvatar(image);
  // };

  return (
    <div className="avatar-generator-page flex items-center justify-center h-[100vh]">
      <div className="Avatar-generator-box flex flex-col items-center justify-center">
        <div className="Generated-avatar-container w-[15rem] h-[15rem] bg-gray-300 rounded-[50%] mb-9">
          <img src='#' alt="Generated Avatar" />
        </div>
        <h1 className="text-2xl font-bold mt-4 mb-4">Create Your Avatar</h1>
        <div className="flex flex-col items-center justify-center w-[20rem] gap-4">
          <label htmlFor="upload-input" className="w-[100%] h-[37px] bg-gray-300 flex items-center justify-center rounded-[20px]">
            Upload Image
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Link to='/scratch-avatar' className="w-[100%] h-[37px] bg-gray-300 flex items-center justify-center rounded-[20px]">Create from scratch</Link>
        </div> 
      </div>
      {/*<h1>Avatar Generator</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={generateAvatar}>Generate Avatar</button>
      {avatar && (
        <div>
          <h2>Generated Avatar</h2>
          <img src={URL.createObjectURL(avatar)} alt="Generated Avatar" />
        </div>
      )}*/}
    </div>
  );
}

export default AvatarGeneratorPage;
