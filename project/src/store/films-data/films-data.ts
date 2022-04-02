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
    setFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    },
    setPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    setCurrentFilm: (state, action) => {
      state.currentFilm = action.payload;
    },
    setSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    cleanCurrentFilm: (state) => {
      state.currentFilm = null;
    },
  },
});

export const {setFilms, setPromoFilm, setCurrentFilm, setSimilarFilms, setReviews, cleanCurrentFilm} = filmsData.actions;
