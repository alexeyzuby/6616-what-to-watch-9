import {useState} from 'react';
import {Films} from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  films: Films,
};

function FilmsList({films}: FilmsListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | null>(null);

  return (
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
  );
}

export default FilmsList;
