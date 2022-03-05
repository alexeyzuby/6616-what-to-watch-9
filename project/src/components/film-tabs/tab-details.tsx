import {Fragment} from 'react';
import {Film} from '../../types/film';

const MINUTES_IN_HOUR = 60;

type TabDetailsProps = {
  film: Film,
}

const getRuntimeStr = (minutes: number): string => {
  if (minutes < MINUTES_IN_HOUR) {
    return `${minutes}m`;
  }

  return `${Math.floor(minutes / MINUTES_IN_HOUR)}h ${minutes % MINUTES_IN_HOUR}m`;
};

function TabDetails({film}: TabDetailsProps): JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {film.starring.map((star, index) => {
              const newLine = index !== film.starring.length - 1;

              return (
                <Fragment key={star}>
                  {`${star}${newLine ? ',' : ''}`}
                  {newLine ? <br/> : ''}
                </Fragment>
              );
            })}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getRuntimeStr(film.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film.released}</span>
        </p>
      </div>
    </div>
  );
}

export default TabDetails;
