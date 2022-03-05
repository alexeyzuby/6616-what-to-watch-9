import dayjs from 'dayjs';
import {Review} from '../../types/review';

const DATE_FORMAT_ATTRIBUTE = 'YYYY-MM-DD';
const DATE_FORMAT_DISPLAY = 'MMMM DD, YYYY';

type FilmReviewProps = {
  review: Review,
};

function FilmReview({review}: FilmReviewProps) {
  const attributeDate = dayjs(review.date).format(DATE_FORMAT_ATTRIBUTE);
  const displayDate = dayjs(review.date).format(DATE_FORMAT_DISPLAY);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={attributeDate}>{displayDate}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default FilmReview;
