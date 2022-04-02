import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {Film} from './film';
import {Review} from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type FilmsData = {
  films: Film[],
  promoFilm: Film | null,
  currentFilm: Film | null | undefined,
  similarFilms: Film[],
  reviews: Review[],
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
