import {MouseEvent} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Films} from '../../types/film';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PlayerScreenProps = {
  films: Films,
}

function PlayerScreen({films}: PlayerScreenProps): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const currentFilm = films.find((film) => film.id === Number(params.id));

  if (!currentFilm) {
    return <NotFoundScreen/>;
  }

  const clickExitHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <div className="player">
      <video src={currentFilm.videoLink} className="player__video"/>

      <button type="button" className="player__exit" onClick={clickExitHandler}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"/>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          {/* TODO: Настроить формат времени */}
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"/>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{currentFilm.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
