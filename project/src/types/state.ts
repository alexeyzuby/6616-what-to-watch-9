import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {Film, SelectedFilm} from './film';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type FilmsData = {
  films: Film[],
  promoFilm: Film | null,
  selectedFilm: SelectedFilm | null | undefined,
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
