import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
    const [hover, setHover] = useState(0);

    const handleStarClick = (index) => {
        onRatingChange(index + 1);
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => (
                <span 
                    key={index} 
                    className={`star ${index < (hover || rating) ? 'filled' : ''}`} 
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => setHover(index + 1)}
                    onMouseLeave={() => setHover(0)}
                    role="button"
                    aria-label={`Rate ${index + 1} star`}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;
