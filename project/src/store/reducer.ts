import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, DEFAULT_GENRE, DEFAULT_LOADED_FILMS_COUNT} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {changeGenre, cleanCurrentFilm, getCurrentFilm, getFilms, getReviews, getSimilarFilms, loadMore, requireAuthorization, resetLoadedFilmsCount} from './action';


type InitialState = {
  authorizationStatus: AuthorizationStatus,
  films: Film[],
  sortedFilms: Film[],
  currentFilm: Film | null | undefined,
  similarFilms: Film[],
  reviews: Review[],
  genres: string[],
  currentGenre: string,
  loadedFilmsCount: number,
  isDataLoaded: boolean,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  films: [],
  sortedFilms: [],
  currentFilm: null,
  similarFilms: [],
  reviews: [],
  genres: [],
  currentGenre: DEFAULT_GENRE,
  loadedFilmsCount: DEFAULT_LOADED_FILMS_COUNT,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getFilms, (state, action) => {
      state.films = action.payload;
      state.sortedFilms = action.payload;
      state.genres = [...new Set([DEFAULT_GENRE, ...Array.from(state.films, ({genre}) => genre)])];
      state.isDataLoaded = true;
    })
    .addCase(getCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(cleanCurrentFilm, (state) => {
      state.currentFilm = null;
    })
    .addCase(getSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(getReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload;
      state.sortedFilms = state.currentGenre === DEFAULT_GENRE ? state.films : state.films.filter((film) => film.genre === state.currentGenre);
    })
    .addCase(loadMore, (state) => {
      state.loadedFilmsCount = state.loadedFilmsCount + DEFAULT_LOADED_FILMS_COUNT;
    })
    .addCase(resetLoadedFilmsCount, (state) => {
      state.loadedFilmsCount = DEFAULT_LOADED_FILMS_COUNT;
    });
});

export {reducer};
