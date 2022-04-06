import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {selectFilms} from '../../store/films-data/selector';
import GenresList from '../genres-list/genres-list';
import FilmsList from '../films-list/films-list';
import ShowMore from '../show-more/show-more';
import {INITIAL_FILMS_COUNT, INITIAL_GENRE} from '../../const';

function FilmsCatalog(): JSX.Element {
  const [currentGenre, setCurrentGenre] = useState(INITIAL_GENRE);
  const [maxFilmsCount, setMaxFilmsCount] = useState(INITIAL_FILMS_COUNT);

  const films = useAppSelector(selectFilms);

  const sortedFilms = currentGenre === INITIAL_GENRE ? films : films.filter((film) => film.genre === currentGenre);
  const genres = [...new Set([INITIAL_GENRE, ...Array.from(films, ({genre}) => genre)])];

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList
        genres={genres}
        currentGenre={currentGenre}
        setCurrentGenre={(genre) => setCurrentGenre(genre)}
        setMaxFilmCount={() => setMaxFilmsCount(INITIAL_FILMS_COUNT)}
      />
      <FilmsList films={sortedFilms.slice(0, maxFilmsCount)}/>
      {sortedFilms.length > maxFilmsCount && <ShowMore setMaxFilmCount={() => setMaxFilmsCount(maxFilmsCount + INITIAL_FILMS_COUNT)}/>}
    </section>
  );
}

export default FilmsCatalog;
