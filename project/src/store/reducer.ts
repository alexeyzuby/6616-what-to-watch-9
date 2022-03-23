import {createReducer} from '@reduxjs/toolkit';
import {films} from '../mocks/films';
import {DEFAULT_GENRE, DEFAULT_SHOW_COUNT} from '../const';
import {changeGenre, showMore, resetShowMoreCount} from './action';

const initialState = {
  genres: [...new Set([DEFAULT_GENRE, ...Array.from(films, ({genre}) => genre)])],
  currentGenre: DEFAULT_GENRE,
  showedFilmsCount: DEFAULT_SHOW_COUNT,
  films: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload;
      state.films = state.currentGenre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === state.currentGenre);
    })
    .addCase(showMore, (state) => {
      state.showedFilmsCount = state.showedFilmsCount + DEFAULT_SHOW_COUNT;
    })
    .addCase(resetShowMoreCount, (state) => {
      state.showedFilmsCount = DEFAULT_SHOW_COUNT;
    });
});

export {reducer};
