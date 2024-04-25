// Swipper.js
import React, { useState } from 'react';
import Data from './Data';
import SwipperCard from '../swipeCard/SwipperCard';

function Swipper() {
    const [profiles, setProfiles] = useState(Data);
    const [matchedProfiles, setMatchedProfiles] = useState([]);
    const [error, setError] = useState(null);
  
    const handleSwipe = (direction, profile) => {
        try {
            if (!profile) {
                throw new Error('Profile is missing');
            }

            if (profile.suspendedUntil && profile.suspendedUntil > Date.now()) {
                // User is suspended, do nothing
                return;
            }

            if (direction === 'right') {
                // Add the profile to matchedProfiles
                setMatchedProfiles(prevMatchedProfiles => [...prevMatchedProfiles, profile]);
            }

            // Optionally, update the profile's suspension status or remove from main profiles list
            const updatedProfile = { ...profile };
            // Example: Set suspension end time to 3 months from now
            updatedProfile.suspendedUntil = Date.now() + (3 * 30 * 24 * 60 * 60 * 1000);
            // Update profile data or remove from main profiles list as needed
            setProfiles(prevProfiles => prevProfiles.filter(p => p.id !== profile.id));
            // Update the profile in the main profiles list (not shown here)
        } catch (error) {
            setError(error.message);
        }
    };
  
    const filteredProfiles = profiles.filter(profile => {
        return !(profile.suspendedUntil && profile.suspendedUntil > Date.now());
    });

    return (
        <div className="App">
            {error && <div className="error">{error}</div>}
            {!error && filteredProfiles.map(profile => (
                <SwipperCard
                    key={profile.id}
                    profile={profile}
                    onSwipe={handleSwipe}
                />
            ))}
        </div>
    );
}

export default Swipper;
