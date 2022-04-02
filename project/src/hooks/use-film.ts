import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from './index';
import {useFilmId} from './use-film-id';
import {fetchSelectedFilmAction} from '../store/api-actions';
import {cleanCurrentFilm} from '../store/films-data/films-data';

export const useFilm = () => {
  const {selectedFilm} = useAppSelector(({FILMS}) => FILMS);

  const selectedFilmId = useFilmId();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFilm === null || selectedFilm?.data.id !== selectedFilmId) {
      dispatch(fetchSelectedFilmAction(selectedFilmId));
    }
  }, [selectedFilm, selectedFilmId, dispatch]);

  useEffect(() => () => {
    dispatch(cleanCurrentFilm());
  }, [dispatch]);

  return selectedFilm;
};
