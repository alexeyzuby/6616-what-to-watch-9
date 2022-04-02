import {useFilm} from '../../hooks/use-film';
import {useFilmId} from '../../hooks/use-film-id';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import Player from '../../components/player/player';

function PlayerScreen(): JSX.Element {
  const selectedFilm = useFilm();
  const selectedFilmId = useFilmId();

  if (selectedFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (selectedFilm === null || selectedFilm.data.id !== selectedFilmId) {
    return <LoadingScreen/>;
  }

  const {videoLink, name} = selectedFilm.data;

  return (
    <Player name={name} link={videoLink}/>
  );
}

export default PlayerScreen;
