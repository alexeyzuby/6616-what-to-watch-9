import {MouseEvent} from 'react';

type GenresListProps = {
  genres: string[],
  currentGenre: string,
  setCurrentGenre: (genre: string) => void;
  setMaxFilmCount: () => void;
}

function GenresList({genres, currentGenre, setCurrentGenre, setMaxFilmCount}: GenresListProps): JSX.Element {
  const genreClickHandler = (evt: MouseEvent<HTMLAnchorElement>, genre: string) => {
    evt.preventDefault();
    setCurrentGenre(genre);
    setMaxFilmCount();
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={`catalog__genres-item${genre === currentGenre ? ' catalog__genres-item--active' : ''}`} key={genre}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => genreClickHandler(evt, genre)}>{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
