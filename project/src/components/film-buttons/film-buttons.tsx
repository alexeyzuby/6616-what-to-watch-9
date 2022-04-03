import {MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {setFavoriteStateAction} from '../../store/api-actions';

type FilmButtonsPromo = {
  id: number,
  isFavorite: boolean,
};

function FilmButtons({id, isFavorite}: FilmButtonsPromo): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickPlayHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`/player/${id}`);
  };

  const clickListHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setFavoriteStateAction({id, isFavorite}));
  };

  return (
    <>
      <button className="btn btn--play film-card__button" type="button" onClick={clickPlayHandler}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button" onClick={clickListHandler}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          {isFavorite ? <use xlinkHref="#in-list"/> : <use xlinkHref="#add"/>}
        </svg>
        <span>My list</span>
      </button>
    </>
  );
}

export default FilmButtons;
