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
    const currentElement = previewRef.current;

    if (currentElement === null) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (isActive) {
      timer = setTimeout(async () => {
        await currentElement.play();
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
