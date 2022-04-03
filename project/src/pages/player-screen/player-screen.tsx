import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import Player from '../../components/player/player';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectCurrentFilms} from '../../store/films-data/selector';
import {useEffect} from 'react';
import {fetchCurrentFilmAction} from '../../store/api-actions';

function PlayerScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();

  const currentFilm = useAppSelector(selectCurrentFilms);
  const currentFilmId = Number(params.id);

  useEffect(() => {
    if(currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
    }
  }, [currentFilmId]);

  if (currentFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <LoadingScreen/>;
  }

  const {videoLink, name} = currentFilm;

  return (
    <Player name={name} link={videoLink}/>
  );
}

export default PlayerScreen;
