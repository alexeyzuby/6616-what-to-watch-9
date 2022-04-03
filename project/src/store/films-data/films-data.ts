import {createSlice} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {NameSpace} from '../../const';

const initialState: FilmsData = {
  films: [],
  favoriteFilms: [],
  promoFilm: null,
  selectedFilm: null,
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
    setFavoriteFilms: (state, action) => {
      state.favoriteFilms = action.payload;
    },
    setPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    setSelectedFilm: (state, action) => {
      state.selectedFilm = action.payload;
    },
    cleanCurrentFilm: (state) => {
      state.selectedFilm = null;
    },
  },
});

export const {setFilms, setFavoriteFilms, setPromoFilm, setSelectedFilm, cleanCurrentFilm} = filmsData.actions;
