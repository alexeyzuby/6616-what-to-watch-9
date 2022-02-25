import {FormEvent, useState} from 'react';
import RatingInput from './rating-input';

const MAX_SCORE = 10;

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const ratingStars: JSX.Element[] = Array(MAX_SCORE);

  for (let i = MAX_SCORE; i > 0; --i) {
    ratingStars[MAX_SCORE - i] = (
      <RatingInput
        key={i}
        value={i}
        checked={i === rating}
        onChange={(value) => setRating(value)}
      />
    );
  }

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    {/* Пока временно обезвредим форму */}
    evt.preventDefault();
  };

  return (
    <form action="#" className="add-review__form" onSubmit={submitHandler}>
      <div className="rating">
        <div className="rating__stars">
          {ratingStars}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={reviewText}
          onChange={({target}) => setReviewText(target.value)}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
