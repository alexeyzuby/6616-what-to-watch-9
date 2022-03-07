import {Fragment, useState} from 'react';
import {Film} from '../../types/film';
import FilmCard from '../film-card/film-card';

const MAX_SIMILAR_COUNT = 4;

type SimilarFilmsProps = {
  films: Film[],
  filmGenre: string,
  filmId: number,
};

function SimilarFilms({films, filmGenre, filmId}: SimilarFilmsProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | null>(null);
  const filmsList = films.filter((film) => film.genre === filmGenre && film.id !== filmId);

  return (
    <Fragment>
      {filmsList.length > 0 && <h2 className="catalog__title">More like this</h2>}

      <div className="catalog__films-list">
        {filmsList.slice(0, MAX_SIMILAR_COUNT).map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            isActive={film.id === activeFilmId}
            onHover={setActiveFilmId}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default SimilarFilms;
