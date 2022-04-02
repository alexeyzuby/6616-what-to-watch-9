import dayjs from 'dayjs';
import {FilmComment} from '../../types/comment';

const DATE_FORMAT_ATTRIBUTE = 'YYYY-MM-DD';
const DATE_FORMAT_DISPLAY = 'MMMM DD, YYYY';

type FilmReviewProps = {
  comment: FilmComment,
};

function FilmReview({comment}: FilmReviewProps) {
  const attributeDate = dayjs(comment.date).format(DATE_FORMAT_ATTRIBUTE);
  const displayDate = dayjs(comment.date).format(DATE_FORMAT_DISPLAY);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={attributeDate}>{displayDate}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}

export default FilmReview;
