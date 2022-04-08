import {FilmComment} from '../../types/comment';
import FilmReview from '../film-review/film-review';

const REVIEWS_COLS_COUNT = 2;

type ReviewsTabProps = {
  comments: FilmComment[],
}

function ReviewsTab({comments}: ReviewsTabProps): JSX.Element {
  if (comments.length === 0) {
    return <p className="film-card__empty">No reviews...</p>;
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.filter((el, index) => (index % REVIEWS_COLS_COUNT) === 0).map((comment) => (
          <FilmReview key={comment.id} comment={comment}/>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {comments.filter((el, index) => (index % REVIEWS_COLS_COUNT) === 1).map((comment) => (
          <FilmReview key={comment.id} comment={comment}/>
        ))}
      </div>
    </div>
  );
}

export default ReviewsTab;
