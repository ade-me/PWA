import React, { useState } from 'react';
import Navbar from '../../layouts/Navbar/Navbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './HomeStyles.css'

function Home() {
  // State to manage comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false); // State to toggle comments visibility

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <section className='flex items-center justify-center flex-col w-screen h-screen'>
      <Navbar />
      <ul className='h-[calc(100vh-150px)] w-[100%] flex flex-col items-center pt-70px pl-3 pr-3 pb-10px gap-5 overflow-y-auto'>
        <li className='Post-container w-[100%] pl-3 pr-3 pb-3 flex flex-col gap-2 rounded-[7px]'>
          <div className='User-name-Icon-container flex items-center justify-between w-[100%]'>
            <div className='flex items-center gap-2'>
              <div className='Avatar-container w-[4.5rem] h-[4.5rem] rounded-[50%] p-1 flex items-center justify-center'>
                <img className='Avatar' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
              </div>
              <div className='flex flex-col'>
                <h3 className='text-xl font-bold'>User Name</h3>
                <span>Location</span>
              </div>
            </div>
            <div className='h-[3rem]'>
              <p className='top-0 right-0'>4:08pm</p>
            </div>
          </div>
          <div className='relative w-[100%] h-[18rem] bg-[#c6c6c6] rounded'>
            {/* Image */}
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Post Image"
              className="absolute inset-0 w-full h-full object-cover rounded"
            />
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between items-center px-4 py-2">
              <div></div>

              <div className='flex items-center w-[17rem] justify-between'>
                {/* Like button and count */}
                <div className="flex items-center mb-2">
                  <button className="flex items-center text-white px-1 py-1">
                    <FavoriteIcon className='mr-1 text-black text-3xl'/>
                  </button>
                  <span>100</span>
                </div>
                {/* Comments button and count */}
                <div className="flex items-center mb-2">
                  <button className="flex items-center text-white px-2 py-1" onClick={() => setShowComments(!showComments)}> {/* Toggle comments visibility */}
                    <svg
                      className='mr-1 text-black text-3xl'
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0.666748C3.582 
                        0.666748 0 3.57608 0
                        7.16608C0 9.25341 1.21133
                        11.1107 3.09333 12.2994C3.672 13.7441
                        2.37133 14.9714 0.998667 15.3014C2.51267 15.4314 5.206 15.2207 7.248
                        13.6361C11.978 13.9947 16 10.9714 16 7.16608C16 3.57608 12.418
                        0.666748 8 0.666748Z"
                        fill="black"
                      />
                  </svg>
                  </button>
                  <span>{comments.length}</span>
                </div>
                {/* Share button and count */}
                <div className="flex items-center mb-2">
                  <button className="flex items-center text-white px-2 py-1">
                    <svg
                      className='mr-1 text-black text-3xl'
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.33333 4.66667C5.174 4.66667 6.66667 
                        6.15933 6.66667 8C6.66667 9.84067 5.174 11.3333
                        3.33333 11.3333C1.49267 11.3333 0 9.84067 0 8C0
                        6.15933 1.49267 4.66667 3.33333 4.66667ZM10.748
                        12.71C10.6993 12.9107 10.6667 13.1173 10.6667
                        13.3333C10.6667 14.806 11.8607 16 13.3333 16C14.806
                        16 16 14.806 16 13.3333C16 11.8607 14.806 10.6667
                        13.3333 10.6667C12.5567 10.6667 11.864 11.004 11.3767
                        11.534L7.718 9.58267C7.56467 10.0067 7.352 10.402 7.08933
                        10.7587L10.748 12.71ZM16 2.66667C16 1.194 14.806 0 13.3333
                        0C11.8607 0 10.6667 1.194 10.6667 2.66667C10.6667 2.88267
                        10.6993 3.08933 10.748 3.29L7.08933 5.24133C7.35267 5.598
                        7.56467 5.99267 7.718 6.41733L11.3767 4.466C11.864 4.996
                        12.5567 5.33333 13.3333 5.33333C14.806 5.33333 16 4.13933
                        16 2.66667Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
          {/* Comments Section */}
          {showComments && (
            <div className="w-full mt-4">
              <h2 className="text-lg font-semibold mb-2">Comments</h2>
              <ul className="space-y-2">
                {comments.map((comment, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded-md" style={{ maxWidth: '250px', wordWrap: 'break-word' }}>{comment}</li>
                ))}
              </ul>
              <div className="Comments-section mt-4 flex items-center gap-2">
                <div className='flex items-center gap-2'>
                  <div className='User-commenting'>
                    <img className='User-face' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='User'/>
                  </div>
                  <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="resize-none w-full"
                ></textarea>
                </div>
                <button onClick={handleAddComment} className="text-white px-4 py-2 rounded-md flex  items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 0L15 18.3333L8.22583 12.3008L14.7275 
                      5.43917L6.0125 11.4617L0 10L20 0ZM7.5
                      13.89V20L10.215 16.3075L7.5
                      13.89Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>
    </section>
  );
}

export default Home;
