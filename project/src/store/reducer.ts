import {createReducer} from '@reduxjs/toolkit';
import {DEFAULT_GENRE, DEFAULT_LOADED_FILMS_COUNT} from '../const';
import {Films} from '../types/film';
import {changeGenre, getFilms, loadMore, resetLoadedFilmsCount, setError} from './action';

type InitialState = {
  films: Films,
  sortedFilms: Films,
  genres: string[],
  currentGenre: string,
  loadedFilmsCount: number,
  isDataLoaded: boolean,
  error: string,
}

const initialState : InitialState = {
  films: [],
  sortedFilms: [],
  genres: [],
  currentGenre: DEFAULT_GENRE,
  loadedFilmsCount: DEFAULT_LOADED_FILMS_COUNT,
  isDataLoaded: false,
  error: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilms, (state, action) => {
      state.films = action.payload;
      state.sortedFilms = action.payload;
      state.genres = [...new Set([DEFAULT_GENRE, ...Array.from(state.films, ({genre}) => genre)])];
      state.isDataLoaded = true;
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
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
