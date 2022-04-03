import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {Film} from './film';
import {FilmComment} from './comment';
import {UserData} from './user';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
};

export type FilmsData = {
  films: Film[],
  favoriteFilms: Film[],
  similarFilms: Film[],
  promoFilm: Film | null,
  currentFilm: Film | null | undefined,
  comments: FilmComment[],
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
