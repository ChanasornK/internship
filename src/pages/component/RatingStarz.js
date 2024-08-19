import React, { useState } from "react";
import { Rating, RatingStar } from "flowbite-react";

const RatingStarz = ({ onRatingSelect, getRating, isEnabled = true }) => {
  const [rating, setRating] = useState(getRating);

  const handleClick = (value) => {
    if (isEnabled) {
      setRating(value);
      onRatingSelect(value); // Pass the rating value to the parent component
    }
  };

  const starStyle = {
    color: "#FFD700", // Yellow color
    cursor: isEnabled ? "pointer" : "default", // Change cursor style based on isEnabled
  };

  return (
    <div className= "">
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
    </div>
  );
};

export default RatingStarz;
