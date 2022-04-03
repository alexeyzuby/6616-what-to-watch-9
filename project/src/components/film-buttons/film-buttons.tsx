import {MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';

type FilmButtonsPromo = {
  id: number,
};

function FilmButtons({id}: FilmButtonsPromo): JSX.Element {
  const navigate = useNavigate();

  const clickPlayHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`/player/${id}`);
  };

  return (
    <>
      <button className="btn btn--play film-card__button" type="button" onClick={clickPlayHandler}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
        <span>My list</span>
      </button>
    </>
  );
}

export default FilmButtons;
