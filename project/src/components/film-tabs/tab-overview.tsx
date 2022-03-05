import {Fragment} from 'react';
import {Film} from '../../types/film';

type TabOverviewProps = {
  film: Film,
}

function TabOverview({film}: TabOverviewProps): JSX.Element {
  const filmStarring = film.starring.join(', ');

  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {filmStarring} and other</strong></p>
      </div>
    </Fragment>
  );
}

export default TabOverview;
