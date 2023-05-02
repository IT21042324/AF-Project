import { StarRating } from "./StarRating";

export function ReviewContainer(props) {
  return (
    <div style={{ width: "100%" }}>
      <div className="review">
        <div className="review-rating">
          <StarRating initialRating={props.review.rating} fixedRating={true} />
        </div>
        <div>
          <h6 className="review-name">{props.review.userName}</h6>
          <div className="review-content">{props.review.review}</div>
        </div>
      </div>
    </div>
  );
}
