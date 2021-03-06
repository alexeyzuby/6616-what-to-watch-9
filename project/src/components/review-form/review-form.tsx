import {ChangeEvent, FormEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {addCommentAction} from '../../store/api-actions';
import {ratingValues, MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH} from '../../const';
import RatingInput from './rating-input';

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [formAccessibility, setFormAccessibility] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();

  const id = Number(params.id);

  const commentChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const reviewTextValue = evt.target.value;

    setComment(reviewTextValue);
    setFormAccessibility(reviewTextValue.length >= MIN_REVIEW_LENGTH && reviewTextValue.length <= MAX_REVIEW_LENGTH);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (rating === 0) {
      toast.error('Film rating must be greater than 0');
      return;
    }

    dispatch(addCommentAction({id, comment, rating}));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={submitHandler}>
      <div className="rating">
        <div className="rating__stars">
          {ratingValues.map((element) => (
            <RatingInput
              key={element}
              value={element}
              checked={element === rating}
              onChange={(value) => setRating(value)}
            />
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={comment}
          onChange={commentChangeHandler}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!formAccessibility}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
