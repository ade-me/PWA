// SwipperCard.js
import React from 'react';
import { Swipeable } from 'react-swipeable';

function SwipperCard({ profile, onSwipe }) {
    const handleSwipe = (eventData) => {
        try {
            if (!profile || !onSwipe) {
                throw new Error('Profile or onSwipe handler is missing');
            }

            const direction = eventData.dir;
            onSwipe(direction, profile);
        } catch (error) {
            console.error('Error handling swipe:', error);
        }
    };

    return (
        <Swipeable onSwiped={handleSwipe}>
            <div className="card">
                <h2>{profile.name}</h2>
                <p>Age: {profile.age}</p>
                <p>Bio: {profile.bio}</p>
            </div>
        </Swipeable>
    );
}

export default SwipperCard;
