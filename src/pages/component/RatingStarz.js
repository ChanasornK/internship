import React, { useState, useEffect } from "react";
import { Rating, RatingStar } from "flowbite-react";

const RatingStarz = ({ onRatingSelect, getRating, isEnabled = true }) => {
  const [rating, setRating] = useState(getRating);

  useEffect(() => {
    setRating(getRating);
  }, [getRating]);

  const handleClick = (value) => {
    if (isEnabled) {
      setRating(value);
      onRatingSelect(value); // Pass the rating value to the parent component
    }
  };

  const starStyle = {
    color: "#FFD700", // Yellow color
    cursor: isEnabled ? "pointer" : "default", 
  };

  return (
    <button className="">
      <Rating>
        {[...Array(5)].map((_, i) => (
          <RatingStar
            key={i}
            filled={rating >= i + 1}
            onClick={() => handleClick(i + 1)}
            style={rating >= i + 1 ? starStyle : {}}
          />
        ))}
      </Rating>
    </button>
  );
};

export default RatingStarz;
