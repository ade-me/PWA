import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import SwiperCard from './SwiperCard';

function Swiper({ profiles }) {
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleSwipe = (direction) => {
    // Logic to handle swipe
    if (direction === 'left') {
      // Swipe left action
      console.log('Left swipe');
    } else if (direction === 'right') {
      // Swipe right action
      console.log('Right swipe');
    }
    // Move to the next profile
    setCurrentProfileIndex(prevIndex => prevIndex + 1);
  };
  return (
    <div {...handlers} className="relative">
      {profiles.slice(currentProfileIndex, currentProfileIndex + 1).map(profile => (
        <div key={profile.id} className="absolute top-0 left-0 w-full">
          <SwiperCard profile={profile} />
        </div>
      ))}
    </div>
  );
}

export default Swiper