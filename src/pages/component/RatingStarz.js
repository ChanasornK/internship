import React, { useState, useEffect } from "react";
import { Rating, RatingStar } from "flowbite-react";

const RatingStarz = ({ userId, itemId }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const savedRating = localStorage.getItem(`userRating_${userId}_${itemId}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [userId, itemId]);

  const handleClick = async (value) => {
    setRating(value);
    localStorage.setItem(`userRating_${userId}_${itemId}`, value);
  };

  const starStyle = {
    color: "#FFD700", // สีเหลือง
    cursor: "pointer",
  };

  return (
    <div className="mr-10">
      <button>
        <Rating>
          <RatingStar
            filled={rating >= 1}
            onClick={() => handleClick(1)}
            style={rating >= 1 ? starStyle : {}}
          />
          <RatingStar
            filled={rating >= 2}
            onClick={() => handleClick(2)}
            style={rating >= 2 ? starStyle : {}}
          />
          <RatingStar
            filled={rating >= 3}
            onClick={() => handleClick(3)}
            style={rating >= 3 ? starStyle : {}}
          />
          <RatingStar
            filled={rating >= 4}
            onClick={() => handleClick(4)}
            style={rating >= 4 ? starStyle : {}}
          />
          <RatingStar
            filled={rating >= 5}
            onClick={() => handleClick(5)}
            style={rating >= 5 ? starStyle : {}}
          />
        </Rating>
      </button>
    </div>
  );
};

export default RatingStarz;
