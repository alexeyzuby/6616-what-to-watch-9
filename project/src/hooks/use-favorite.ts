import {useAppSelector} from './index';

export const useFavorite = (id: number): boolean => {
  const {favoriteFilms} = useAppSelector(({FILMS}) => FILMS);
  return !!favoriteFilms.find((film) => film.id === id);
};
