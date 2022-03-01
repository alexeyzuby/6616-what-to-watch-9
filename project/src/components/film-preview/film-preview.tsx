import {useEffect, useRef} from 'react';

const TIMER_DURATION = 1000;
const VIDEO_HEIGHT = 175;

type FilmPreviewProps = {
  src: string,
  poster: string,
  isActive: boolean,
  isMuted?: boolean,
};

function FilmPreview({src, poster, isActive, isMuted}: FilmPreviewProps): JSX.Element {
  const previewRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (previewRef.current === null) {
      return;
    }

    const currentElement = previewRef.current;
    let timer: ReturnType<typeof setTimeout>;

    if (isActive) {
      timer = setTimeout(() => {
        currentElement.play();
      }, TIMER_DURATION);
    }

    return () => {
      clearTimeout(timer);
      currentElement.load();
    };
  }, [isActive]);

  return (
    <video src={src} poster={poster} height={VIDEO_HEIGHT} ref={previewRef} muted={isMuted} loop/>
  );
}

export default FilmPreview;
