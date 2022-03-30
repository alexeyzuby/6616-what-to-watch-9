import {useState} from 'react';
import {DEFAULT_GENRE, DEFAULT_LOADED_FILMS_COUNT} from '../../const';
import {useAppSelector} from '../../hooks';
import GenresList from '../genres-list/genres-list';
import FilmsList from '../films-list/films-list';
import ShowMore from '../show-more/show-more';

function FilmsCatalog(): JSX.Element {
  const [currentGenre, setCurrentGenre] = useState(DEFAULT_GENRE);
  const [maxFilmsCount, setMaxFilmsCount] = useState(DEFAULT_LOADED_FILMS_COUNT);

  const {films} = useAppSelector(({FILMS}) => FILMS);

  const sortedFilms = currentGenre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === currentGenre);
  const genres = [...new Set([DEFAULT_GENRE, ...Array.from(films, ({genre}) => genre)])];

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList
        genres={genres}
        currentGenre={currentGenre}
        setCurrentGenre={(genre) => setCurrentGenre(genre)}
        setMaxFilmCount={() => setMaxFilmsCount(DEFAULT_LOADED_FILMS_COUNT)}
      />
      <FilmsList films={sortedFilms.slice(0, maxFilmsCount)}/>
      {sortedFilms.length > maxFilmsCount && <ShowMore setMaxFilmCount={() => setMaxFilmsCount(maxFilmsCount + DEFAULT_LOADED_FILMS_COUNT)}/>}
    </section>
  );
}

export default FilmsCatalog;
