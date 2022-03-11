import {useState} from 'react';
import {Film} from '../../types/film';
import FilmCard from '../film-card/film-card';

type SimilarFilmsProps = {
  films: Film[],
};

function SimilarFilms({films}: SimilarFilmsProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | null>(null);

  if (films.length === 0) {
    return <p>No similar films...</p>;
  }

  return (
    <>
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        {films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            isActive={film.id === activeFilmId}
            onHover={setActiveFilmId}
          />
        ))}
      </div>
    </>
  );
}

export default SimilarFilms;
