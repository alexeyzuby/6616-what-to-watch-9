import {MouseEvent, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Video from './video';

const SECONDS_IN_HOUR = 3600;

type PlayerProps = {
  name: string,
  link: string,
}

const getFormattedDuration = (seconds: number) => {
  dayjs.extend(duration);
  return dayjs.duration(seconds, 'seconds').format(seconds > SECONDS_IN_HOUR ? 'HH:mm:ss' : 'mm:ss');
};

function Player({name, link}: PlayerProps): JSX.Element {
  const playerRef = useRef<HTMLDivElement>(null);
  const player = playerRef.current;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [watchedTime, setWatchedTime] = useState(0);

  const playerProgress = Math.round((watchedTime / videoDuration) * 100) || 0;
  const secondsLeft = Math.floor(videoDuration - watchedTime);
  const timeLeft = getFormattedDuration(secondsLeft);

  const navigate = useNavigate();

  useEffect(() => {
    if (player === null) {
      return;
    }

    if (isFullScreen) {
      player.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [player, isFullScreen]);

  const clickExitHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <div className="player" ref={playerRef} data-testid="player">
      {isLoaded ? null : <div>Loading...</div>}
      <Video
        link={link}
        isPlaying={isPlaying}
        setIsLoaded={() => setIsLoaded(true)}
        setVideoDuration={setVideoDuration}
        setWatchedTime={setWatchedTime}
      />
      <button type="button" className="player__exit" data-testid="exit" onClick={clickExitHandler}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playerProgress} max="100"/>
            <div className="player__toggler" style={{left: `${playerProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{`-${timeLeft}`}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" data-testid="play" onClick={() => setIsPlaying(!isPlaying)}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              {isPlaying ? <use xlinkHref="#pause"/> : <use xlinkHref="#play-s"/>}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>
          <button type="button" className="player__full-screen" data-testid="fullscreen" onClick={() => setFullScreen(!isFullScreen)}>
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

export default Player;
