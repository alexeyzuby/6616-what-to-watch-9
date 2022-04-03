import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from './index';
import {fetchCurrentFilmAction} from '../store/api-actions';
import {cleanCurrentFilm} from '../store/films-data/films-data';
import {selectCurrentFilms} from '../store/films-data/selector';

export const useFilm = (filmId: number) => {
  const currentFilm = useAppSelector(selectCurrentFilms);

  const currentFilmId = filmId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentFilm === null || currentFilm?.data.id !== currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
    }
  }, [currentFilm, currentFilmId, dispatch]);

  useEffect(() => () => {
    dispatch(cleanCurrentFilm());
  }, [dispatch]);

  return currentFilm;
};
