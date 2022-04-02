import {useEffect, useRef} from 'react';

type VideoProps = {
  link: string,
  isPlaying: boolean,
  setIsLoaded: () => void;
  setVideoDuration: (value: number) => void,
  setWatchedTime: (value: number) => void,
}

function Video({link, isPlaying, setIsLoaded, setVideoDuration, setWatchedTime}: VideoProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideo = videoRef.current;

  useEffect(() => {
    if (currentVideo === null) {
      return;
    }

    if (isPlaying) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }

    setVideoDuration(currentVideo.duration);
  });

  const timeChangeHandler = () => {
    if (currentVideo === null) {
      return;
    }
    setWatchedTime(currentVideo.currentTime);
  };

  return (
    <video
      src={link}
      className="player__video"
      onTimeUpdate={timeChangeHandler}
      onCanPlay={setIsLoaded}
      ref={videoRef}
      muted
    />
  );
}

export default Video;
