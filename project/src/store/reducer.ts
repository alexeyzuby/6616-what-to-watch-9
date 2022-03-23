import {createReducer} from '@reduxjs/toolkit';
import {films} from '../mocks/films';
import {DEFAULT_GENRE, DEFAULT_LOADED_FILMS_COUNT} from '../const';
import {changeGenre, loadMore, resetLoadedFilmsCount} from './action';

const initialState = {
  genres: [...new Set([DEFAULT_GENRE, ...Array.from(films, ({genre}) => genre)])],
  currentGenre: DEFAULT_GENRE,
  loadedFilmsCount: DEFAULT_LOADED_FILMS_COUNT,
  films: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload;
      state.films = state.currentGenre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === state.currentGenre);
    })
    .addCase(loadMore, (state) => {
      state.loadedFilmsCount = state.loadedFilmsCount + DEFAULT_LOADED_FILMS_COUNT;
    })
    .addCase(resetLoadedFilmsCount, (state) => {
      state.loadedFilmsCount = DEFAULT_LOADED_FILMS_COUNT;
    });
});

export {reducer};
