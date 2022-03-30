import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {cleanCurrentFilm, getCurrentFilm, getFilms, getReviews, getSimilarFilms, requireAuthorization} from './action';


type InitialState = {
  authorizationStatus: AuthorizationStatus,
  films: Film[],
  currentFilm: Film | null | undefined,
  similarFilms: Film[],
  reviews: Review[],
  isDataLoaded: boolean,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  films: [],
  currentFilm: null,
  similarFilms: [],
  reviews: [],
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getFilms, (state, action) => {
      state.films = action.payload;
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
    });
});

export {reducer};
