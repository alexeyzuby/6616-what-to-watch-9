import {FormEvent, useState} from 'react';
import RatingInput from './rating-input';

const MAX_SCORE = 10;

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    {/* Пока временно обезвредим форму */}
    evt.preventDefault();
  };

  return (
    <form action="#" className="add-review__form" onSubmit={submitHandler}>
      <div className="rating">
        <div className="rating__stars">
          {Array.from(Array(MAX_SCORE), (element, index) => (
            <RatingInput
              key={index + 1}
              value={index + 1}
              checked={index + 1 === rating}
              onChange={(value) => setRating(value)}
            />
          )).reverse()}
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
