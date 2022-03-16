import {createReducer} from '@reduxjs/toolkit';
import {films} from '../mocks/films';
import {DEFAULT_GENRE} from '../const';
import {changeGenre} from './action';

const initialState = {
  genres: [...new Set([DEFAULT_GENRE, ...Array.from(films, ({genre}) => genre)])],
  currentGenre: DEFAULT_GENRE,
  films: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload;
      state.films = state.currentGenre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === state.currentGenre);
    });
});

export {reducer};
