import {Review} from '../../types/review';
import FilmReview from '../film-review/film-review';

const REVIEWS_COLS_COUNT = 2;
const NO_REVIEWS_TEXT_COLOR = '#382c2a';

type ReviewsTabProps = {
  reviews: Review[],
}

function ReviewsTab({reviews}: ReviewsTabProps): JSX.Element {
  if (reviews.length === 0) {
    return <p style={{color: NO_REVIEWS_TEXT_COLOR}}>No reviews...</p>;
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.filter((el, index) => (index % REVIEWS_COLS_COUNT) === 0).map((review) => (
          <FilmReview key={review.id} review={review}/>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.filter((el, index) => (index % REVIEWS_COLS_COUNT) === 1).map((review) => (
          <FilmReview key={review.id} review={review}/>
        ))}
      </div>
    </div>
  );
}

export default ReviewsTab;
