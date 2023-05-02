import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export function StarRating(props) {
  const [rating, setRating] = useState(props.initialRating);

  const handleClick = (newRating) => {
    setRating(newRating);
  };

  const stars = [];

  if (props.fixedRating) {
    for (let i = 1; i <= props.initialRating; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={solidStar}
          onClick={() => handleClick(i)}
          style={{ color: "#FFA500" }}
        />
      );
    }
  } else if (props.maxRating) {
    for (let i = 1; i <= props.maxRating; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
          onClick={() => {
            handleClick(i);

            props.enterRating && props.enterRating(i);
          }}
        />
      );
    }
  }
  return <div>{stars}</div>;
}
