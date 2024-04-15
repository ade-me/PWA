import React, { useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { CiFaceSmile } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import './TestStyles.css';

function PostIngModal({ isOpen, onClose }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        const videos = files.filter(file => file.type.startsWith('video/'));
        const invalidVideos = videos.filter(video => video.duration > 180);

        if (invalidVideos.length > 0) {
            alert('Please select videos that are 3 minutes or shorter.');
            return;
        }

        setSelectedFiles(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    if (!isOpen) return null;

    return (
        <section className="fixed bottom-0 left-0 w-full h-screen flex justify-center items-center bg-[#D9D9D9] bg-opacity-45 pl-7 pr-7 pb-5">
            <form className="bg-white rounded-[15px] shadow-lg w-screen h-[33rem] pt-5 flex flex-col justify-between">
                <div className='h-[100%] flex flex-col justify-between'>
                    <div className='h-[3rem] flex items-center justify-between pl-3 pr-3'>
                        <h1 className='text-[1.2rem] font-bold'>New Post</h1>
                        <button onClick={onClose}><LiaTimesSolid className='text-gray-700 text-2xl'/></button>
                    </div>
                    <div className='Underline h-[2px] bg-[#D9D9D9] mb-4'></div>
                    <div className='flex flex-col items-center justify-between h-[20rem] pl-3 pr-3'>
                        <div className='flex gap-4 flex-col w-[100%]'>
                            <div className='Caption-box flex items-center justify-between h-[2.5rem] w-[100%]'>
                                <input className='text-[#c6c6c6] h-[2.5rem] w-[90%] bg-transparent pl-3 pr-3' type='text' placeholder='Write your Caption...' />
                                <div className='Emojis-btn flex items-center justify-center w-[40px]'>
                                    <CiFaceSmile className='text-[#c9c6c6] text-3xl'/>
                                </div>
                            </div>
                            <div className='Info-box flex items-center gap-2 w-[100%] h-[4.5rem] p-1'>
                                <IoIosInformationCircle className="text-7xl font-bold text-[#adabab]"/>
                                <p className="text-[11px] text-[#adabab]">Remember, you can upload up to 100MB.
                                    videos cannot exceed 3 minutes and 30 second and you
                                    cannot upload photos higher than 5MB.
                                </p>
                            </div>
                            <label htmlFor="file-upload" className='Posts-box flex items-center justify-center h-[8.5rem] w-[100%] bg-white'>
                                <input id="file-upload" type='file' accept='image/*, video/*' style={{ display: 'none' }} onChange={handleFileChange} multiple />
                                {previewUrls.map((url, index) => (
                                    url.endsWith('.mp4') ? 
                                    <video key={index} src={url} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls /> :
                                    <img key={index} src={url} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ))}
                                {previewUrls.length === 0 && "Click here to upload files"}
                            </label>
                        </div>
                    </div>
                    <div className='h-[20%] w-[100%] bg-blue-500'>
                        <hr />
                    </div>
                </div>
                <div className="Post text-center py-3 bg-gray-200 mb-3">Post button</div>
            </form>
        </section>
    );
}

export default PostIngModal;
