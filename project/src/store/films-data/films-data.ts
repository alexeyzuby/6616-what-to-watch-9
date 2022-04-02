import {createSlice} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {NameSpace} from '../../const';

const initialState: FilmsData = {
  films: [],
  promoFilm: null,
  currentFilm: null,
  similarFilms: [],
  reviews: [],
  isDataLoaded: false,
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    getFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    },
    getPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    getCurrentFilm: (state, action) => {
      state.currentFilm = action.payload;
    },
    getSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    getReviews: (state, action) => {
      state.reviews = action.payload;
    },
    cleanCurrentFilm: (state) => {
      state.currentFilm = null;
    },
  },
});

export const {getFilms, getPromoFilm, getCurrentFilm, getSimilarFilms, getReviews, cleanCurrentFilm} = filmsData.actions;
