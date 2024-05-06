import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoData from './VideoData';
import { useSwipeable } from 'react-swipeable';

const Videos = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSwipe = (direction) => {
        if (direction === 'UP' && currentIndex < VideoData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (direction === 'DOWN' && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handlers = useSwipeable({
        onSwipedUp: () => handleSwipe('UP'),
        onSwipedDown: () => handleSwipe('DOWN'),
    });

    return (
        <section {...handlers}>
            {VideoData.map((videoPost, index) => (
                <div key={videoPost.id} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                    {index === currentIndex && <VideoPlayer src={videoPost.url} />}
                </div>
            ))}
        </section>
    );
};

export default Videos;
