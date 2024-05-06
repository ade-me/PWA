import React from 'react';

function LikedProfiles({ likedProfiles }) {
  if (!likedProfiles || likedProfiles.length === 0) {
    return <div>No liked profiles yet.</div>;
  }

  return (
    <section className='w-[100vw] h-[100vh]'>
      <h2>Liked Profiles:</h2>
      <ul>
        {likedProfiles.map(profile => (
          <li key={profile.id}>
            <p>Name: {profile.name}</p>
            <p>Age: {profile.age}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LikedProfiles;
