import {Review} from '../../types/review';
import FilmReview from '../film-review/film-review';

type TabReviewsProps = {
  reviews: Review[],
}

function TabReviews({reviews}: TabReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.filter((el, index) => (index % 2) === 0).map((review) => (
          <FilmReview key={review.id} review={review}/>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.filter((el, index) => (index % 2) === 1).map((review) => (
          <FilmReview key={review.id} review={review}/>
        ))}
      </div>
    </div>
  );
}

export default TabReviews;
