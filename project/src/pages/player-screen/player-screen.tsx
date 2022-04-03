import {useFilm} from '../../hooks/use-film';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import Player from '../../components/player/player';
import {useParams} from 'react-router-dom';

function PlayerScreen(): JSX.Element {
  const params = useParams();

  const currentFilmId = Number(params.id);
  const currentFilm = useFilm(currentFilmId);

  if (currentFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (currentFilm === null || currentFilm.data.id !== currentFilmId) {
    return <LoadingScreen/>;
  }

  const {videoLink, name} = currentFilm.data;

  return (
    <Player name={name} link={videoLink}/>
  );
}

export default PlayerScreen;
