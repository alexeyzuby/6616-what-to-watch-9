import {MouseEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, resetShowMoreCount} from '../../store/action';

type GenresListProps = {
  genres: string[],
}

function GenresList({genres}: GenresListProps): JSX.Element {
  const currentGenre = useAppSelector((state) => state.currentGenre);

  const dispatch = useAppDispatch();

  const genreClickHandler = (evt: MouseEvent<HTMLAnchorElement>, genre: string) => {
    evt.preventDefault();
    dispatch(resetShowMoreCount());
    dispatch(changeGenre(genre));
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
