import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {Film, currentFilm} from './film';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type FilmsData = {
  films: Film[],
  favoriteFilms: Film[],
  promoFilm: Film | null,
  currentFilm: currentFilm | null | undefined,
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
